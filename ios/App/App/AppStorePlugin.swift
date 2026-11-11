import Foundation
import Capacitor
import StoreKit
import UIKit

/// Apple in-app subscriptions (StoreKit 2) for the web app, exposed to
/// JavaScript as `AppStore`. Signed transactions are sent to the server
/// (api/apple-verify) to unlock Pro; this file never decides access itself.
@objc(AppStorePlugin)
public class AppStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AppStorePlugin"
    public let jsName = "AppStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "currentEntitlements", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "manageSubscriptions", returnType: CAPPluginReturnPromise),
    ]

    private var updatesTask: Task<Void, Never>?

    override public func load() {
        // Renewals, Ask to Buy approvals and purchases made on another device.
        updatesTask = Task.detached { [weak self] in
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await transaction.finish()
                }
                self?.notifyListeners("transactionUpdated", data: ["jws": result.jwsRepresentation])
            }
        }
    }

    deinit {
        updatesTask?.cancel()
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        let ids = call.getArray("productIds", String.self) ?? []
        Task {
            do {
                let products = try await Product.products(for: ids)
                let list: [[String: Any]] = products.map { product in
                    var item: [String: Any] = [
                        "id": product.id,
                        "displayName": product.displayName,
                        "description": product.description,
                        "displayPrice": product.displayPrice,
                    ]
                    if let period = product.subscription?.subscriptionPeriod {
                        item["periodUnit"] = Self.unitName(period.unit)
                        item["periodValue"] = period.value
                    }
                    return item
                }
                call.resolve(["products": list])
            } catch {
                call.reject("Could not load products", nil, error)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId") else {
            call.reject("productId is required")
            return
        }
        let token = call.getString("appAccountToken").flatMap { UUID(uuidString: $0) }
        Task {
            do {
                guard let product = try await Product.products(for: [productId]).first else {
                    call.reject("Product not found")
                    return
                }
                var options: Set<Product.PurchaseOption> = []
                if let token = token {
                    options.insert(.appAccountToken(token))
                }
                let result = try await product.purchase(options: options)
                switch result {
                case .success(let verification):
                    if case .verified(let transaction) = verification {
                        await transaction.finish()
                    }
                    call.resolve(["status": "purchased", "jws": verification.jwsRepresentation])
                case .userCancelled:
                    call.resolve(["status": "cancelled"])
                case .pending:
                    call.resolve(["status": "pending"])
                @unknown default:
                    call.resolve(["status": "unknown"])
                }
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
        }
    }

    @objc func currentEntitlements(_ call: CAPPluginCall) {
        Task {
            call.resolve(["transactions": await Self.entitlementJWS()])
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        Task {
            do {
                try await AppStore.sync()
            } catch {
                // The user may cancel the App Store sign-in; still report what we have.
            }
            call.resolve(["transactions": await Self.entitlementJWS()])
        }
    }

    @objc func manageSubscriptions(_ call: CAPPluginCall) {
        Task { @MainActor in
            guard let scene = self.bridge?.viewController?.view.window?.windowScene else {
                call.reject("No window")
                return
            }
            do {
                try await AppStore.showManageSubscriptions(in: scene)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
        }
    }

    private static func entitlementJWS() async -> [String] {
        var list: [String] = []
        for await result in Transaction.currentEntitlements {
            list.append(result.jwsRepresentation)
        }
        return list
    }

    private static func unitName(_ unit: Product.SubscriptionPeriod.Unit) -> String {
        switch unit {
        case .day: return "day"
        case .week: return "week"
        case .month: return "month"
        case .year: return "year"
        @unknown default: return "unknown"
        }
    }
}

/// Root view controller that registers the app's own plugins.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(AppStorePlugin())
    }
}
