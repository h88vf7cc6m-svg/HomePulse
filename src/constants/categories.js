export const CATEGORIES = [
  { id: 'hvac', name: 'HVAC', icon: '🌬️', color: '#00C9A7' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#2A6DD9' },
  { id: 'exterior', name: 'Exterior', icon: '🏡', color: '#1DB954' },
  { id: 'electrical', name: 'Electrical', icon: '⚡', color: '#FFB300' },
  { id: 'safety', name: 'Safety', icon: '🛡️', color: '#FF7043' },
  { id: 'insurance', name: 'Insurance', icon: '📋', color: '#00BCD4' },
  { id: 'pest', name: 'Pest Control', icon: '🐜', color: '#8BC34A' },
  { id: 'irrigation', name: 'Irrigation', icon: '💧', color: '#29B6F6' },
  { id: 'weather', name: 'Weather Emergency', icon: '🌪️', color: '#FF5252' },
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]

export const FREQUENCIES = ['Monthly', 'Quarterly', 'Seasonal', 'Annual', 'One-time']

export const REGIONS = [
  { id: 'southeast', name: 'Florida / Southeast' },
  { id: 'midwest', name: 'Midwest' },
  { id: 'northeast', name: 'Northeast' },
  { id: 'northwest', name: 'Pacific Northwest' },
  { id: 'southwest', name: 'Southwest' },
  { id: 'west', name: 'West / California' },
]

export const TASK_TEMPLATES = {
  hvac: {
    title: 'HVAC Maintenance',
    icon: '🌬️',
    tips: 'Your HVAC system should be serviced twice a year — once before cooling season and once before heating season. Regular maintenance extends equipment life and lowers energy bills.',
    tasks: [
      { title: 'Replace Air Filter', frequency: 'Monthly', notes: 'Check filter monthly and replace every 1-3 months depending on filter type and pets/allergies. A dirty filter strains the system and reduces air quality.' },
      { title: 'Annual HVAC Tune-Up (Cooling)', frequency: 'Annual', notes: 'Schedule a professional inspection each spring before summer heat hits. Technician checks refrigerant, coils, electrical connections, and thermostat calibration.' },
      { title: 'Annual HVAC Tune-Up (Heating)', frequency: 'Annual', notes: 'Schedule a professional inspection each fall before winter. Technician checks heat exchanger, burners, and safety controls.' },
      { title: 'Clean AC Condensate Drain Line', frequency: 'Quarterly', notes: 'Pour a cup of diluted bleach or vinegar down the drain line to prevent clogs and mold buildup. A clogged drain can cause water damage.' },
      { title: 'Clear Debris Around Outdoor Unit', frequency: 'Seasonal', notes: 'Keep at least 2 feet of clearance around the outdoor condenser unit. Remove leaves, grass clippings, and debris that restrict airflow.' },
      { title: 'Test Thermostat', frequency: 'Seasonal', notes: 'Test heating and cooling modes at each season change. Replace batteries in programmable thermostats annually.' },
    ],
    regional: {
      southeast: { tips: 'Florida\'s humidity puts extreme stress on AC systems. Prioritize monthly filter changes and quarterly drain line cleaning to prevent mold and water damage.', tasks: [
        { title: 'Clean Evaporator and Condenser Coils', frequency: 'Annual', notes: 'Florida humidity causes rapid mold and algae buildup on coils. Have coils professionally cleaned annually to maintain efficiency and prevent mold from blowing into living spaces.' },
        { title: 'Install UV Air Purifier in Air Handler', frequency: 'One-time', notes: 'UV light systems kill mold and bacteria in the air handler — essential in humid Southeast climates. Ask your HVAC tech about adding one during your next service.' },
      ]},
      midwest: { tips: 'Midwest homes rely heavily on heating 5+ months a year. Furnace and heat exchanger maintenance is critical for both efficiency and safety.', tasks: [
        { title: 'Inspect Heat Exchanger for Cracks', frequency: 'Annual', notes: 'A cracked heat exchanger leaks carbon monoxide into living spaces — a silent, deadly hazard. Have a professional inspect during your annual heating tune-up every fall.' },
        { title: 'Check Attic and Crawl Space Insulation', frequency: 'Annual', notes: 'Proper insulation reduces heating load dramatically. Add insulation if attic is below R-49. This is the single highest-ROI improvement for Midwest homes.' },
      ]},
      northeast: { tips: 'Oil and propane heating systems common in the Northeast need annual service before winter and fuel supply management throughout the season.', tasks: [
        { title: 'Service Oil or Propane Heating System', frequency: 'Annual', notes: 'Schedule annual burner cleaning, nozzle replacement, and efficiency test each October before demand peaks. A well-tuned oil burner uses significantly less fuel.' },
        { title: 'Bleed Radiators (Hot Water Heat)', frequency: 'Annual', notes: 'If you have hydronic (hot water) radiators, bleed air from each radiator each fall. Trapped air causes cold spots and reduces system efficiency.' },
      ]},
      northwest: { tips: 'Pacific Northwest homes often use heat pumps and radiant systems. During wildfire smoke season, upgrade filters and minimize fresh air intake.', tasks: [
        { title: 'Inspect and Service Heat Pump', frequency: 'Annual', notes: 'Heat pumps are the primary heating and cooling source in many PNW homes. Annual service ensures efficient operation in both heating and cooling modes. Clean outdoor coils of debris and moss.' },
        { title: 'Upgrade to MERV-13 Filter During Smoke Season', frequency: 'Seasonal', notes: 'During wildfire smoke events (July-October), upgrade to MERV-13 or higher filters and set HVAC to recirculate rather than bringing in outside air.' },
      ]},
      southwest: { tips: 'Evaporative coolers and AC both need attention before the brutal Southwest summer. Don\'t wait until June — service in March or April.', tasks: [
        { title: 'Evaporative Cooler Spring Startup', frequency: 'Annual', notes: 'Each March/April: replace pads, clean reservoir and float valve, oil the motor, check belts, and run a test cycle. Switch off swamp cooler and use AC during July-September monsoon season when humidity is high.' },
        { title: 'Check Attic Ventilation for Heat Load', frequency: 'Annual', notes: 'Southwest attics can reach 160°F+ in summer, dramatically increasing AC load. Ensure adequate ridge and soffit vents. Consider a radiant barrier or reflective insulation to reduce attic heat gain.' },
      ]},
      west: { tips: 'California homes experience both extreme heat events and wildfire smoke. HVAC filters and air quality management are critical in summer and fall.', tasks: [
        { title: 'Upgrade HVAC Filter Before Wildfire Season', frequency: 'Annual', notes: 'Each June, install a MERV-13 filter and set system to recirculate during air quality alerts. A standard MERV-8 filter does not capture fine smoke particles (PM2.5).' },
        { title: 'Check AC Capacity for Heat Dome Events', frequency: 'Annual', notes: 'California heat dome events push temperatures well above historic norms. Have your AC checked in April. Know the location of your nearest cooling center for extreme heat emergencies.' },
      ]},
    },
  },
  plumbing: {
    title: 'Plumbing',
    icon: '🔧',
    tips: 'Plumbing issues are among the most costly home repairs. Regular inspections catch small leaks before they become major water damage.',
    tasks: [
      { title: 'Check for Leaks Under Sinks', frequency: 'Monthly', notes: 'Inspect under all sinks for moisture, drips, or staining. Early detection prevents mold and cabinet damage.' },
      { title: 'Test Water Pressure', frequency: 'Quarterly', notes: 'Normal water pressure is 40-80 PSI. High pressure stresses pipes and appliances. Install a pressure gauge on an outdoor hose bib to check.' },
      { title: 'Flush Water Heater', frequency: 'Annual', notes: 'Drain 1-2 gallons from the water heater to remove sediment buildup. Sediment reduces efficiency and shortens tank life. Most tanks last 8-12 years.' },
      { title: 'Inspect Toilet for Running Water', frequency: 'Quarterly', notes: 'Add food coloring to the tank — if color appears in the bowl without flushing, the flapper needs replacing. A running toilet wastes up to 200 gallons per day.' },
      { title: 'Clean Showerhead and Faucet Aerators', frequency: 'Annual', notes: 'Soak in vinegar to dissolve mineral deposits. Clogged aerators reduce water flow and pressure.' },
      { title: 'Locate and Label Water Shutoff Valves', frequency: 'Annual', notes: 'Know where your main shutoff and individual fixture shutoffs are. In a leak emergency, quick shutoff saves thousands in damage.' },
    ],
    regional: {
      southeast: { tips: 'Florida\'s hard water causes rapid mineral buildup. Flush water heater twice a year and consider a water softener.', tasks: [
        { title: 'Flush Water Heater Twice a Year', frequency: 'Seasonal', notes: 'Florida\'s hard water deposits sediment rapidly. Flush the water heater in spring and fall to maintain efficiency and extend tank life beyond the typical 8-12 years.' },
        { title: 'Inspect Pipes for Mold in Walls', frequency: 'Annual', notes: 'High humidity can cause condensation on cold water pipes inside walls, leading to hidden mold. Look for musty smells or discoloration near plumbing walls.' },
      ]},
      midwest: { tips: 'Frozen pipes are the #1 plumbing emergency in the Midwest. Know your shutoff and insulate vulnerable pipes before November.', tasks: [
        { title: 'Insulate Pipes Before First Freeze', frequency: 'Annual', notes: 'Each October, wrap pipes in unheated garages, crawl spaces, and exterior walls with foam pipe insulation. Even a brief freeze can burst a pipe and cause thousands in water damage.' },
        { title: 'Disconnect and Drain Garden Hoses', frequency: 'Annual', notes: 'Before first freeze, disconnect all garden hoses and shut off exterior faucet supply lines. A connected hose traps water and can freeze back into the pipe.' },
      ]},
      northeast: { tips: 'Oil and propane water heaters are common in the Northeast. Annual service keeps them efficient and prevents dangerous carbon monoxide buildup.', tasks: [
        { title: 'Service Oil or Gas Water Heater', frequency: 'Annual', notes: 'Have oil or gas water heaters serviced annually for efficiency and safety. Check flue and draft hood for proper venting. Carbon monoxide from a poorly venting water heater is a serious hazard.' },
        { title: 'Insulate Hot Water Pipes', frequency: 'One-time', notes: 'Insulating hot water pipes reduces heat loss and delivers hot water faster. Especially important in older Northeast homes with long pipe runs between heater and fixtures.' },
      ]},
      northwest: { tips: 'PNW water is generally soft but high rainfall means moisture intrusion near plumbing penetrations is common.', tasks: [
        { title: 'Inspect Plumbing Penetrations for Moisture', frequency: 'Annual', notes: 'Heavy PNW rainfall can drive moisture through exterior wall penetrations around pipes. Inspect and reseal with waterproof caulk annually. Look for staining or softness in walls near plumbing entry points.' },
        { title: 'Check Sump Pump Before Rainy Season', frequency: 'Annual', notes: 'Test sump pump each October. Pour water into pit to confirm float switch activates. Install a battery backup pump — power outages during winter storms are common when you need it most.' },
      ]},
      southwest: { tips: 'Hard water and drought conditions make water conservation and mineral buildup the top plumbing concerns in the Southwest.', tasks: [
        { title: 'Inspect and Clean Water Softener', frequency: 'Annual', notes: 'Southwest water is extremely hard (high mineral content). If you have a water softener, check salt levels monthly and clean the brine tank annually to keep it operating effectively.' },
        { title: 'Check for Water Waste and Leaks', frequency: 'Quarterly', notes: 'During drought restrictions, a leaking toilet or faucet can waste thousands of gallons monthly and result in fines. Read your water meter before and after a 2-hour no-use period to detect hidden leaks.' },
      ]},
      west: { tips: 'California water restrictions and earthquake risk make leak detection and seismic shutoff valves important priorities.', tasks: [
        { title: 'Install Earthquake Automatic Gas Shutoff Valve', frequency: 'One-time', notes: 'California building codes increasingly require seismic gas shutoff valves. They automatically cut gas after a significant earthquake, preventing fires. Required in many California cities — check your local requirements.' },
        { title: 'Audit Water Usage for Drought Compliance', frequency: 'Quarterly', notes: 'California water districts issue mandatory restrictions during drought. Audit irrigation and indoor usage quarterly. Fix all leaks promptly — water waste fines can be substantial.' },
      ]},
    },
  },
  exterior: {
    title: 'Exterior',
    icon: '🏡',
    tips: 'Your home\'s exterior is its first line of defense against weather. Regular inspection and maintenance prevents water intrusion, structural damage, and costly repairs.',
    tasks: [
      { title: 'Inspect Roof for Damage', frequency: 'Annual', notes: 'Look for missing, cracked, or curling shingles. Check flashing around chimneys, vents, and skylights. Best done after major storms. Hire a professional for a thorough inspection every 3-5 years.' },
      { title: 'Clean Gutters and Downspouts', frequency: 'Seasonal', notes: 'Clear gutters of leaves and debris each spring and fall. Clogged gutters cause water to back up under roofing and damage fascia. Ensure downspouts direct water at least 6 feet from foundation.' },
      { title: 'Inspect and Caulk Windows and Doors', frequency: 'Annual', notes: 'Check caulk and weatherstripping around all windows and doors. Cracked or missing caulk allows water and air infiltration, increasing energy costs.' },
      { title: 'Pressure Wash Exterior', frequency: 'Annual', notes: 'Clean siding, driveway, walkways, and deck to remove dirt, mold, and mildew. Prevents long-term staining and deterioration.' },
      { title: 'Inspect Foundation for Cracks', frequency: 'Annual', notes: 'Walk around the foundation looking for new or widening cracks. Horizontal cracks are more serious than vertical ones. Fill small cracks with hydraulic cement or epoxy.' },
      { title: 'Check Driveway and Walkways', frequency: 'Annual', notes: 'Fill cracks in concrete or asphalt to prevent water from expanding them. Seal asphalt driveways every 2-3 years.' },
    ],
    regional: {
      southeast: { tips: 'Florida\'s sun, humidity, and salt air accelerate exterior deterioration faster than most climates. Paint, caulk, and wood surfaces need more frequent attention.', tasks: [
        { title: 'Inspect and Repaint Exterior Every 5-7 Years', frequency: 'Annual', notes: 'Florida sun and humidity break down exterior paint faster than in other climates. Inspect paint annually for peeling, fading, or chalking. Repaint when needed to protect siding and wood from moisture intrusion.' },
        { title: 'Check for Salt Air Corrosion (Coastal Homes)', frequency: 'Annual', notes: 'If within 5 miles of the coast, inspect all metal hardware, railings, and fasteners for rust annually. Use marine-grade stainless steel or galvanized hardware. Rinse exterior surfaces monthly to remove salt deposits.' },
      ]},
      midwest: { tips: 'Freeze-thaw cycles are the primary enemy of Midwest exteriors. Cracks that seem minor in fall can become major structural issues by spring.', tasks: [
        { title: 'Inspect Exterior After Winter for Freeze Damage', frequency: 'Annual', notes: 'Each March/April, inspect foundation, driveway, walkways, and siding for cracks that opened or widened over winter. Freeze-thaw cycles expand small cracks dramatically. Fill promptly before the next winter.' },
        { title: 'Check and Reseal Deck Before Summer', frequency: 'Annual', notes: 'Midwest winters are brutal on wood decks. Sand and reseal or stain your deck each spring. Replace any boards that have rotted, warped, or become structurally unsound.' },
      ]},
      northeast: { tips: 'Ice dams and wind-driven rain are the primary exterior threats in the Northeast. Proper flashing and gutter maintenance are non-negotiable.', tasks: [
        { title: 'Inspect Roof Flashing After Winter', frequency: 'Annual', notes: 'Ice dams can loosen or damage flashing around chimneys, skylights, and dormers. Inspect each spring and reseal with roofing cement where needed. Damaged flashing is a major source of water intrusion.' },
        { title: 'Check Wood Siding and Trim for Rot', frequency: 'Annual', notes: 'Northeast moisture causes wood rot, especially on north-facing walls and trim near the ground. Probe suspected areas with a screwdriver. Soft wood means rot — repair promptly before it spreads to structural members.' },
      ]},
      northwest: { tips: 'Moss, algae, and rot are the primary exterior threats in the PNW\'s wet climate. Treat roofs and wood surfaces proactively.', tasks: [
        { title: 'Treat Roof for Moss and Algae', frequency: 'Annual', notes: 'PNW moss growth on roofs is aggressive and can lift shingles and cause rot. Apply zinc or copper sulfate treatment each fall. Avoid pressure washing shingles — it removes protective granules. Install zinc strips at the ridge for ongoing prevention.' },
        { title: 'Inspect and Seal Wood Siding Annually', frequency: 'Annual', notes: 'PNW rainfall drives moisture into wood siding and trim. Inspect caulk and paint each spring. Re-caulk any gaps immediately. Bare or peeling wood will rot within 1-2 seasons in the Pacific Northwest climate.' },
      ]},
      southwest: { tips: 'UV exposure and stucco cracking are the primary exterior concerns. Monsoon rains can quickly exploit any unsealed cracks in the building envelope.', tasks: [
        { title: 'Inspect and Seal Stucco Cracks Before Monsoon', frequency: 'Annual', notes: 'Each June before monsoon season (July-September), inspect all stucco for hairline cracks. Fill with elastomeric caulk or stucco patch and paint to match. Monsoon rains will drive water into even small cracks, causing interior damage.' },
        { title: 'Check Flat Roof Coating and Drains', frequency: 'Annual', notes: 'Southwest flat roofs rely on elastomeric coatings and scuppers for waterproofing. Inspect coating for bubbling, cracking, or peeling each spring. Clear all roof drains before monsoon season — ponding water is the leading cause of flat roof failure.' },
      ]},
      west: { tips: 'Wildfire ember resistance and earthquake-related exterior damage are the top priorities for California homeowners.', tasks: [
        { title: 'Inspect Eaves and Vents for Ember Gaps', frequency: 'Annual', notes: 'Embers enter homes through vents and gaps in eaves — not flames. Each June, install 1/16-inch metal mesh over all attic, crawl space, and foundation vents. Box in open eaves with fire-resistant materials.' },
        { title: 'Check Exterior for Earthquake Damage After Any Significant Shaking', frequency: 'Seasonal', notes: 'After any earthquake above 4.0, inspect the foundation, chimney, and exterior walls for new cracks. Check that the home is still properly connected to the foundation. Document any damage for insurance.' },
      ]},
    },
  },
  electrical: {
    title: 'Electrical',
    icon: '⚡',
    tips: 'Electrical issues are a leading cause of house fires. Never ignore flickering lights, tripping breakers, or burning smells — these require immediate professional attention.',
    tasks: [
      { title: 'Test GFCI Outlets', frequency: 'Monthly', notes: 'Press the "Test" button on GFCI outlets in bathrooms, kitchen, garage, and outdoors. The outlet should lose power. Press "Reset" to restore. Replace any that don\'t trip or reset.' },
      { title: 'Test Arc Fault Circuit Interrupters (AFCIs)', frequency: 'Quarterly', notes: 'AFCIs protect against electrical fires from damaged wiring. Test using the Test button on the breaker. Required in bedrooms by modern code.' },
      { title: 'Inspect Electrical Panel', frequency: 'Annual', notes: 'Look for signs of corrosion, burnt smells, or double-tapped breakers. Have a licensed electrician inspect the panel every 5-10 years or if you notice any issues.' },
      { title: 'Check Outdoor Outlets and Lighting', frequency: 'Seasonal', notes: 'Inspect outdoor outlets for moisture damage and ensure covers are properly sealed. Check that exterior lighting is working and bulbs are weather-rated.' },
      { title: 'Inspect Extension Cords and Power Strips', frequency: 'Annual', notes: 'Replace any cords with frayed insulation, bent prongs, or damaged connectors. Never run extension cords under rugs or through walls. Use surge protectors for electronics.' },
    ],
    regional: {
      southeast: { tips: 'Lightning strikes are far more common in Florida than any other state. Whole-home surge protection is essential.', tasks: [
        { title: 'Install Whole-Home Surge Protector', frequency: 'One-time', notes: 'Florida has the highest lightning strike frequency in the US. A whole-home surge protector at the panel protects all appliances and electronics simultaneously. Have an electrician install a UL-listed panel-mounted suppressor.' },
      ]},
      midwest: { tips: 'Power outages from ice storms and tornadoes are common. Generator wiring and backup power should be part of your electrical plan.', tasks: [
        { title: 'Install Generator Transfer Switch', frequency: 'One-time', notes: 'Never connect a portable generator directly to home wiring — it can back-feed and kill utility workers. Have a licensed electrician install a manual or automatic transfer switch for safe generator hookup.' },
      ]},
      northeast: { tips: 'Older Northeast homes often have outdated electrical systems. Knob-and-tube or aluminum wiring should be inspected and upgraded.', tasks: [
        { title: 'Inspect for Knob-and-Tube or Aluminum Wiring', frequency: 'One-time', notes: 'Many older Northeast homes (pre-1970) still have knob-and-tube or aluminum wiring, which is a fire hazard and may make homeowner\'s insurance difficult to obtain. Have an electrician evaluate and recommend upgrades.' },
      ]},
      northwest: { tips: 'Extended power outages from windstorms are common in the PNW. Backup power planning is worthwhile for most homes.', tasks: [
        { title: 'Plan and Install Backup Power', frequency: 'One-time', notes: 'PNW windstorms regularly cause multi-day outages. Consider a generator transfer switch or battery backup system (like a Tesla Powerwall). At minimum, have a portable generator and proper extension cord setup for refrigerator and heating.' },
      ]},
      southwest: { tips: 'Summer peak demand can stress the electrical grid. Pre-cooling and smart thermostat use reduce demand charges and prevent outages.', tasks: [
        { title: 'Inspect Outdoor Electrical for UV and Heat Damage', frequency: 'Annual', notes: 'Southwest UV exposure and extreme heat degrades outdoor electrical conduit, wiring insulation, and outlet covers faster than in other climates. Inspect all exterior electrical annually for cracking, brittleness, or discoloration.' },
      ]},
      west: { tips: 'California utility shutoffs (PSPS events) during fire weather mean backup power is increasingly important for California homeowners.', tasks: [
        { title: 'Prepare for PSPS (Public Safety Power Shutoff) Events', frequency: 'Annual', notes: 'PG&E and other California utilities shut off power during high fire-weather events. Prepare: stock battery packs, have a portable generator or home battery, keep devices charged when fire weather is forecast, and know how to manually open your garage door.' },
      ]},
    },
  },
  safety: {
    title: 'Safety',
    icon: '🛡️',
    tips: 'Working smoke and carbon monoxide detectors save lives. Keep emergency supplies stocked and make sure every family member knows your home\'s emergency plan.',
    tasks: [
      { title: 'Test Smoke Detectors', frequency: 'Monthly', notes: 'Press and hold the test button until the alarm sounds. Replace batteries annually (or use 10-year sealed battery models). Replace the entire unit every 10 years.' },
      { title: 'Test Carbon Monoxide Detectors', frequency: 'Monthly', notes: 'Test using the test button. CO detectors should be on every level and near sleeping areas. Replace every 5-7 years — they have a chemical sensor that degrades over time.' },
      { title: 'Check Fire Extinguisher', frequency: 'Annual', notes: 'Verify the pressure gauge needle is in the green zone. Check for physical damage or corrosion. Have it professionally inspected every 6 years and replaced or recharged as needed.' },
      { title: 'Review Home Emergency Plan', frequency: 'Annual', notes: 'Ensure all family members know two exit routes from every room, the meeting point outside, and emergency contacts. Practice a fire drill with children.' },
      { title: 'Inspect Door and Window Locks', frequency: 'Quarterly', notes: 'Test all locks for smooth operation. Lubricate with graphite spray if stiff. Consider upgrading to deadbolts if not already installed.' },
      { title: 'Check Emergency Supply Kit', frequency: 'Annual', notes: 'Restock water (1 gallon per person per day for 3 days), food, flashlights, batteries, first aid kit, medications, and important documents. Check expiration dates.' },
    ],
    regional: {
      southeast: { tips: 'Hurricane evacuation and extended power outages require a larger emergency supply than the standard 3-day kit.', tasks: [
        { title: 'Build 7-Day Hurricane Emergency Kit', frequency: 'Annual', notes: 'Standard 3-day kits aren\'t enough for a major hurricane and its aftermath. Stock 7 days of water (1 gal/person/day), non-perishable food, medications, important documents in a waterproof bag, cash, battery radio, and portable phone chargers.' },
      ]},
      midwest: { tips: 'Tornado shelter readiness and a weather radio are the top safety priorities for Midwest homeowners.', tasks: [
        { title: 'Designate and Stock Tornado Shelter', frequency: 'Annual', notes: 'Identify the safest interior room on the lowest floor (no windows). Stock it with: NOAA weather radio with batteries, flashlight, shoes, water, and basic first aid. Practice getting there quickly, especially with children and pets.' },
      ]},
      northeast: { tips: 'Winter storms can isolate your home for days. A larger supply kit and an indoor-safe heat backup are essential.', tasks: [
        { title: 'Stock Winter Storm Safety Kit', frequency: 'Annual', notes: 'Northeast winter storms can cut power for 3-5 days. Stock: 5-day food and water supply, battery or hand-crank radio, flashlights, extra blankets, an approved indoor-safe propane heater, and carbon monoxide detector with battery backup.' },
      ]},
      northwest: { tips: 'Earthquake preparedness is a top priority given the PNW\'s proximity to the Cascadia Subduction Zone.', tasks: [
        { title: 'Earthquake Drop-Cover-Hold-On Drill', frequency: 'Annual', notes: 'Practice drop-cover-hold-on with all household members annually. Know that the "doorway" myth is false — get under a sturdy table and hold on. Keep shoes under the bed in case of broken glass. Identify your utility shutoffs.' },
      ]},
      southwest: { tips: 'Extreme heat is a life-safety emergency. Know your cooling resources and have a plan for power outages during heat waves.', tasks: [
        { title: 'Heat Emergency Plan', frequency: 'Annual', notes: 'Identify your nearest cooling center (library, mall, community center). Know the signs of heat stroke vs. heat exhaustion. Check on elderly neighbors during heat advisories. Keep a minimum 72-hour water supply — more in summer given hydration needs.' },
      ]},
      west: { tips: 'Wildfire evacuation readiness is the most important safety preparation for California homeowners — especially those in or near wildland areas.', tasks: [
        { title: 'Prepare and Practice Wildfire Evacuation', frequency: 'Annual', notes: 'Sign up for county emergency alerts. Prepare a go bag with: documents, medications (2-week supply), phone chargers, cash, change of clothes, and water. Know two evacuation routes from your neighborhood. Practice the plan with family. Don\'t wait for an evacuation order to start packing.' },
      ]},
    },
  },
  insurance: {
    title: 'Insurance',
    icon: '📋',
    tips: 'Your homeowner\'s insurance policy should reflect the actual replacement cost of your home and belongings. Review it annually and after any major improvements.',
    tasks: [
      { title: 'Review Homeowner\'s Insurance Policy', frequency: 'Annual', notes: 'Compare your coverage limits to current rebuilding costs in your area. Costs have risen significantly — many homeowners are underinsured. Contact your agent to discuss coverage gaps.' },
      { title: 'Update Home Inventory', frequency: 'Annual', notes: 'Walk through your home and document valuables with photos or video. Store the inventory in the cloud or off-site. This is essential for filing accurate claims after theft or disaster.' },
      { title: 'Review Flood Insurance', frequency: 'Annual', notes: 'Standard homeowner\'s policies do NOT cover flooding. Check your flood zone status (FEMA\'s flood map) and consider NFIP or private flood insurance, especially in coastal or low-lying areas.' },
      { title: 'Check Deductibles and Riders', frequency: 'Annual', notes: 'Confirm your deductible amounts for standard claims vs. named-storm or wind events. Add scheduled personal property riders for jewelry, art, or electronics that exceed standard limits.' },
    ],
    regional: {
      southeast: { tips: 'Florida homeowners face some of the highest insurance costs in the nation. Understanding wind vs. flood coverage is critical.', tasks: [
        { title: 'Review Wind Mitigation Report', frequency: 'Annual', notes: 'A wind mitigation inspection (about $150) documents hurricane-resistant features of your home and can reduce your wind insurance premium by 20-40%. Ensure your report is current and submitted to your insurer.' },
        { title: 'Confirm Separate Flood Policy', frequency: 'Annual', notes: 'Homeowner\'s insurance does NOT cover flooding. In Florida, even homes outside flood zones flood regularly. Review your NFIP or private flood policy annually — flood insurance has a 30-day waiting period before it takes effect.' },
      ]},
      midwest: { tips: 'Tornado and hail damage are the most common large insurance claims in the Midwest.', tasks: [
        { title: 'Review Hail and Wind Deductibles', frequency: 'Annual', notes: 'Many Midwest policies have a separate, higher deductible for wind and hail claims (often 1-2% of dwelling value). Know your deductible before a storm so you\'re not surprised. Consider a lower deductible if hail is frequent in your area.' },
      ]},
      northeast: { tips: 'Flood and nor\'easter coverage gaps leave many Northeast homeowners significantly underinsured.', tasks: [
        { title: 'Review Named Storm and Ice Dam Coverage', frequency: 'Annual', notes: 'Some Northeast policies exclude or limit coverage for ice dam damage or named storms. Review your policy exclusions annually. If you have a finished basement, ensure you have flood and sewer backup coverage.' },
      ]},
      northwest: { tips: 'Earthquake insurance is not included in standard policies — and the Cascadia Subduction Zone makes it worth serious consideration.', tasks: [
        { title: 'Consider Earthquake Insurance', frequency: 'Annual', notes: 'Standard homeowner\'s policies exclude earthquake damage. Given the Cascadia Subduction Zone risk, evaluate earthquake insurance annually. CEA (California Earthquake Authority) offers coverage in Oregon and Washington. Compare deductibles (often 10-25% of dwelling value).' },
      ]},
      southwest: { tips: 'Flood insurance is critical in the Southwest — flash floods from monsoon storms cause major damage even in areas that rarely see rain.', tasks: [
        { title: 'Review Flash Flood and Monsoon Coverage', frequency: 'Annual', notes: 'Southwest monsoon season (July-September) brings intense, localized flooding. Standard policies don\'t cover flooding. If near a wash, arroyo, or low-lying area, purchase NFIP or private flood insurance before July 1 each year (30-day waiting period applies).' },
      ]},
      west: { tips: 'California\'s wildfire insurance crisis has left many homeowners uninsured or severely underinsured. Review your coverage annually.', tasks: [
        { title: 'Verify Wildfire Coverage and Replacement Cost', frequency: 'Annual', notes: 'Many major California insurers have stopped issuing new policies or are non-renewing existing ones. Verify your policy is still active at renewal. If dropped, explore the FAIR Plan (last-resort coverage) plus a Difference in Conditions (DIC) policy for broader protection.' },
        { title: 'Document Home for Wildfire Claim', frequency: 'Annual', notes: 'Each June, walk through your home on video documenting all rooms, appliances, and valuables. Store in cloud storage outside California. In a total loss wildfire, this documentation is essential for getting your full claim paid.' },
      ]},
    },
  },
  pest: {
    title: 'Pest Control',
    icon: '🐜',
    tips: 'Prevention is far cheaper than treatment. Seal entry points, eliminate moisture, and maintain a pest control schedule before infestations take hold.',
    tasks: [
      { title: 'Quarterly Pest Control Treatment', frequency: 'Quarterly', notes: 'Schedule professional perimeter treatment every 3 months. Covers common pests: ants, roaches, spiders, and rodents. More frequent treatment may be needed in humid climates.' },
      { title: 'Inspect for Termites', frequency: 'Annual', notes: 'Look for mud tubes along foundation, hollow-sounding wood, or discarded wings near windows. Annual professional termite inspection is strongly recommended, especially in the South.' },
      { title: 'Seal Entry Points', frequency: 'Annual', notes: 'Caulk gaps around pipes, wires, and conduits where they enter the home. Install door sweeps and repair damaged screens. Even a dime-sized gap can let mice in.' },
      { title: 'Check for Moisture Issues', frequency: 'Seasonal', notes: 'Pests thrive where moisture collects. Fix leaky pipes, ensure proper drainage away from foundation, and use a dehumidifier in crawl spaces or basements.' },
      { title: 'Rodent Prevention Check', frequency: 'Seasonal', notes: 'Look for droppings, gnaw marks, or nesting materials in attic, garage, and under sinks. Set traps proactively in fall when rodents seek warmth indoors.' },
    ],
    regional: {
      southeast: { tips: 'Florida faces year-round pest pressure. Termites, palmetto bugs, and mosquitoes require consistent prevention — not just reactive treatment.', tasks: [
        { title: 'Annual Termite Inspection and Bond', frequency: 'Annual', notes: 'Florida has the highest termite pressure in the US (subterranean and drywood species). Maintain an active termite bond with a licensed pest control company. Annual inspections are essential — termite damage is not covered by homeowner\'s insurance.' },
        { title: 'Mosquito Control — Eliminate Standing Water', frequency: 'Monthly', notes: 'Florida mosquitoes breed in any standing water — including bottle caps. Monthly: dump and refill bird baths, check gutters for clogs, clear saucers under planters. Consider a professional misting system for yards.' },
      ]},
      midwest: { tips: 'Mice and stink bugs seeking warmth in fall are the primary pest concerns for Midwest homeowners.', tasks: [
        { title: 'Fall Rodent Exclusion Check', frequency: 'Annual', notes: 'Each September/October before temperatures drop, inspect the exterior for gaps larger than a dime (mice) or quarter (rats). Seal with steel wool and caulk or hardware cloth. Rodents enter homes seeking warmth as the Midwest winter approaches.' },
      ]},
      northeast: { tips: 'Carpenter ants, mice, and stink bugs are top pests in the Northeast. Cold winters push rodents indoors in fall.', tasks: [
        { title: 'Inspect for Carpenter Ants in Spring', frequency: 'Annual', notes: 'Carpenter ants swarm in the Northeast in spring. Unlike termites, they don\'t eat wood but excavate it to nest — especially in moisture-damaged wood. Find and fix the moisture source. Have an exterminator treat colonies found inside walls.' },
      ]},
      northwest: { tips: 'Moisture from the PNW climate creates ideal conditions for carpenter ants, termites, and rodents. Moisture control is the foundation of pest prevention.', tasks: [
        { title: 'Inspect Crawl Space for Pests and Moisture', frequency: 'Annual', notes: 'PNW crawl spaces with moisture issues attract termites, carpenter ants, and rodents. Inspect crawl space each spring. Ensure vapor barrier is intact and vents are clear. Address any moisture before it creates a pest habitat.' },
      ]},
      southwest: { tips: 'Scorpions, termites, and pack rats are the primary pest concerns in the Southwest desert climate.', tasks: [
        { title: 'Scorpion Prevention and Inspection', frequency: 'Quarterly', notes: 'Scorpions enter Southwest homes through gaps as small as a credit card. Seal all gaps in doors, windows, and utility penetrations. Remove wood piles and debris near the home. Consider UV blacklight inspection at night — scorpions glow bright green.' },
      ]},
      west: { tips: 'California faces year-round pest pressure with termites, rodents, and — increasingly — ant pressure from drought conditions.', tasks: [
        { title: 'Drywood Termite Inspection', frequency: 'Annual', notes: 'California has significant drywood termite pressure, especially in Southern California. Unlike subterranean termites, drywood termites don\'t need soil contact — they infest wood directly. Look for frass (tiny pellets) near wood surfaces. Whole-house fumigation may be needed for severe infestations.' },
      ]},
    },
  },
  irrigation: {
    title: 'Irrigation',
    icon: '💧',
    tips: 'A properly maintained irrigation system uses up to 50% less water than manual watering. Regular checks prevent leaks that can dramatically increase your water bill.',
    tasks: [
      { title: 'Inspect Sprinkler Heads', frequency: 'Monthly', notes: 'Check for clogged, broken, or misaligned heads. A broken sprinkler head wastes hundreds of gallons per month. Adjust heads to avoid watering sidewalks and driveways.' },
      { title: 'Check Controller/Timer Settings', frequency: 'Seasonal', notes: 'Adjust watering schedules each season. Water deeply and infrequently (2-3 times per week in summer, less in cooler months). Most systems over-water when left on default settings.' },
      { title: 'Inspect Drip Lines and Emitters', frequency: 'Quarterly', notes: 'Check drip irrigation emitters for clogs or damage. Flush the system periodically. Replace emitters that are cracked or delivering uneven water flow.' },
      { title: 'Winterize Irrigation System', frequency: 'Annual', notes: 'Blow out all water from lines before first freeze to prevent pipe bursts. Relevant for Midwest and Northeast — not required in Florida/Southeast.' },
      { title: 'Spring System Startup', frequency: 'Annual', notes: 'Turn system back on slowly after winter. Check all zones for proper coverage. Test the rain sensor to ensure it shuts off the system during rainfall.' },
    ],
    regional: {
      southeast: { tips: 'Florida water districts have strict irrigation schedules and restrictions. Know your allowed watering days and install a rain sensor if not already present.', tasks: [
        { title: 'Confirm Irrigation Complies with Water District Rules', frequency: 'Annual', notes: 'Most Florida water management districts limit irrigation to 2 days per week with specific watering windows. Confirm your schedule complies. Violations can result in fines. Install a WaterSense-certified smart controller to automatically adjust for rain and restrictions.' },
      ]},
      midwest: { tips: 'Midwest irrigation systems need full winterization before the first freeze to prevent cracked pipes and heads.', tasks: [
        { title: 'Professional Irrigation Blowout Before Freeze', frequency: 'Annual', notes: 'Each October, hire a professional to blow out all irrigation lines with compressed air before first freeze. A single frozen line can crack multiple zones. This $75-150 service prevents thousands in repair costs.' },
      ]},
      northeast: { tips: 'Irrigation seasons are shorter in the Northeast. Proper startup and winterization are the most important annual tasks.', tasks: [
        { title: 'Spring Irrigation Startup Inspection', frequency: 'Annual', notes: 'Each May, turn on the system zone by zone, checking each head for damage from winter frost. Check backflow preventer is operating properly. Adjust spray patterns for any new plantings.' },
      ]},
      northwest: { tips: 'PNW winters are wet enough that irrigation is typically off from October through May. Smart controllers prevent over-watering during rainy periods.', tasks: [
        { title: 'Install Rain Sensor or Smart Controller', frequency: 'One-time', notes: 'PNW rainfall makes manual irrigation scheduling wasteful. A smart controller (Rachio, RainBird) uses local weather data to skip irrigation when rain is forecast or recent. Required in many PNW municipalities. Reduces water bills by 30-50%.' },
      ]},
      southwest: { tips: 'Water conservation is not optional in the Southwest — it\'s a legal requirement during drought conditions. Drip irrigation and drought-tolerant plants are the long-term solution.', tasks: [
        { title: 'Convert to Drip Irrigation', frequency: 'One-time', notes: 'Southwest water restrictions make spray irrigation increasingly difficult to justify. Drip irrigation delivers water directly to roots with 90%+ efficiency vs. 50-70% for spray heads. Many Southwest water districts offer rebates for drip conversion.' },
        { title: 'Check Irrigation for Water Waste Compliance', frequency: 'Monthly', notes: 'During drought restrictions, running water onto pavement or having broken heads can result in fines. Walk your system monthly while running to catch any waste. Fix broken heads within 24-48 hours.' },
      ]},
      west: { tips: 'California\'s recurring droughts have made water-efficient irrigation a requirement, not a preference. Many utilities offer rebates for smart controllers and drought-tolerant landscaping.', tasks: [
        { title: 'Apply for Water-Efficient Landscape Rebates', frequency: 'Annual', notes: 'Many California water districts offer rebates of $1-3 per square foot to remove turf grass and replace with drought-tolerant landscaping. Check your water district\'s website annually — programs open and close based on available funding.' },
        { title: 'Set Smart Controller for Evapotranspiration (ET)', frequency: 'Seasonal', notes: 'California\'s summer heat and low humidity cause rapid evapotranspiration. Set smart controllers to ET-based scheduling (available on Rachio and RainBird). This adjusts automatically for heat waves and avoids over- or under-watering during variable California summers.' },
      ]},
    },
  },
  weather: {
    title: 'Weather Emergency',
    icon: '🌪️',
    tips: 'Preparation before a weather emergency is the difference between minor inconvenience and major loss. Have a plan, know your risks, and don\'t wait until a storm is imminent.',
    tasks: [],
    regional: {
      southeast: {
        name: 'Florida / Southeast — Hurricane Prep',
        tips: 'Hurricane season runs June 1 through November 30. The time to prepare is before a storm is named — not when it\'s 48 hours away.',
        tasks: [
          { title: 'Hurricane Season Kickoff Inspection', frequency: 'Annual', notes: 'Each May, inspect shutters/panels, generator, fuel supply, and emergency kit. Test the generator under load. Confirm your insurance covers wind and flood events.' },
          { title: 'Install/Inspect Hurricane Shutters or Impact Windows', frequency: 'Annual', notes: 'Ensure all shutters are in working order and hardware is not corroded. Know which panels go where before a storm warning is issued. Impact windows require no action but inspect for seal integrity.' },
          { title: 'Trim Trees and Shrubs', frequency: 'Seasonal', notes: 'Trim dead branches and overhanging limbs before hurricane season (May) and again mid-season. Flying debris is the #1 cause of storm damage.' },
          { title: 'Test and Fuel Generator', frequency: 'Seasonal', notes: 'Run your generator monthly under load. Store enough fuel for 5-7 days. Rotate fuel with a stabilizer. Never run a generator indoors or in the garage.' },
          { title: 'Stock Hurricane Emergency Supplies', frequency: 'Annual', notes: 'Minimum 7-day supply: water (1 gal/person/day), non-perishable food, medications, battery/hand-crank radio, flashlights, cash, phone chargers, important documents in waterproof bag.' },
          { title: 'Review Evacuation Routes', frequency: 'Annual', notes: 'Know your county\'s evacuation zones (check local emergency management website). Identify two evacuation routes and a destination. Pre-register pets if sheltering with animals.' },
          { title: 'Secure Outdoor Furniture and Items', frequency: 'Seasonal', notes: 'Before any named storm, bring all outdoor furniture, grills, planters, and decorations inside or secure with straps. Unsecured items become dangerous projectiles at hurricane wind speeds.' },
          { title: 'Check Garage Door Bracing', frequency: 'Annual', notes: 'Garage doors are the most vulnerable point in a hurricane. Ensure your door is rated for high winds or install a bracing kit. An un-braced door can fail and cause the roof to lift.' },
          { title: 'Inspect Roof and Attic', frequency: 'Annual', notes: 'Hire a roofer to inspect before hurricane season. Ensure all shingles, tiles, and flashing are secure. Check attic for proper hurricane straps connecting roof structure to walls.' },
          { title: 'Document Home and Belongings', frequency: 'Annual', notes: 'Walk through with video before hurricane season begins. Store video in cloud storage. Essential for insurance claims after storm damage.' },
        ],
      },
      midwest: {
        name: 'Midwest — Tornado & Winter Storm Prep',
        tips: 'The Midwest faces tornado season (spring/summer) and severe winter storms. Prepare for both and know your local warning systems.',
        tasks: [
          { title: 'Test Tornado Safe Room or Shelter', frequency: 'Annual', notes: 'Locate your safest shelter area (lowest floor, interior room, away from windows). Stock it with a battery radio, flashlight, water, and shoes. Know the difference between a Tornado Watch and Warning.' },
          { title: 'Register for Local Emergency Alerts', frequency: 'Annual', notes: 'Sign up for your county\'s Wireless Emergency Alerts and text/email notification system. Have a NOAA weather radio with battery backup in your home.' },
          { title: 'Inspect Sump Pump Before Spring', frequency: 'Annual', notes: 'Test sump pump each March by pouring water into the pit. Clean the inlet screen. Consider a battery backup sump pump for power outage protection during heavy spring rains.' },
          { title: 'Winterize Exterior Pipes and Faucets', frequency: 'Annual', notes: 'Before first freeze (October/November), disconnect and drain garden hoses. Shut off and drain exterior faucet lines. Insulate pipes in unheated spaces like garages and crawl spaces.' },
          { title: 'Stock Winter Emergency Supplies', frequency: 'Annual', notes: 'Keep in your home: rock salt, snow shovel, ice melt, battery-powered carbon monoxide detector, extra blankets, backup heating source (approved for indoor use), 3-day food and water supply.' },
          { title: 'Stock Winter Car Emergency Kit', frequency: 'Annual', notes: 'Keep in each vehicle: ice scraper, jumper cables, blanket, sand or kitty litter for traction, small shovel, flashlight, and energy bars. Check antifreeze and tire pressure as temperatures drop.' },
          { title: 'Service Snowblower Before Winter', frequency: 'Annual', notes: 'Each October, change the oil, replace spark plugs, check belts and skid plates, and add fuel stabilizer. A snowblower that won\'t start during a blizzard is useless.' },
          { title: 'Inspect and Clean Fireplace/Chimney', frequency: 'Annual', notes: 'Have chimney professionally cleaned and inspected before heating season. Creosote buildup is a leading cause of house fires. Install a chimney cap to keep animals and debris out.' },
          { title: 'Check Attic Insulation and Ventilation', frequency: 'Annual', notes: 'Proper attic insulation prevents ice dams — ridges of ice that form at the roof edge and back water under shingles. Ensure attic vents are clear and insulation is at least R-49 in cold climates.' },
        ],
      },
      northeast: {
        name: 'Northeast — Winter Storm & Nor\'easter Prep',
        tips: 'Nor\'easters, ice storms, and heavy snowfall are major threats. Prepare your home before Thanksgiving — once storms hit, it\'s too late.',
        tasks: [
          { title: 'Winterize Pipes Before First Freeze', frequency: 'Annual', notes: 'Insulate pipes in attics, crawl spaces, and exterior walls. Know where your main water shutoff is. Keep cabinet doors under sinks open during extreme cold to let warm air reach pipes.' },
          { title: 'Inspect Roof for Snow Load Capacity', frequency: 'Annual', notes: 'Have your roof inspected before winter. Know the snow load limit. After heavy snowfall (over 6 inches of wet snow), consider a roof rake to reduce weight. A collapsed roof is a life-safety emergency.' },
          { title: 'Check Heating System Before Winter', frequency: 'Annual', notes: 'Service oil, gas, or propane heating system each October. Replace filters, check fuel supply, and test emergency shutoff. Schedule delivery before demand peaks and prices rise.' },
          { title: 'Stock Heating Fuel Supply', frequency: 'Annual', notes: 'Order oil or propane before October. Keep tank at least half full throughout winter. Know your average burn rate so you don\'t run out during a storm when delivery may be delayed.' },
          { title: 'Ice Dam Prevention', frequency: 'Annual', notes: 'Ensure attic is properly insulated and ventilated to keep roof surface cold and prevent uneven melting. Install heat cables in problem areas. After major snowfall, use a roof rake to remove snow from the first 3-4 feet of roof edge.' },
          { title: 'Service Snowblower Before Winter', frequency: 'Annual', notes: 'Each October, change the oil, replace spark plugs, check belts and impeller, and add fuel stabilizer. Test run before the first storm. Keep extra shear pins on hand.' },
          { title: 'Inspect and Clean Chimney', frequency: 'Annual', notes: 'Have chimney professionally swept and inspected before heating season. Creosote and bird nests are fire hazards. Install a chimney cap and damper if not already in place.' },
          { title: 'Prepare Nor\'easter Emergency Kit', frequency: 'Annual', notes: 'Stock: 3-7 day food and water supply, battery/hand-crank radio, flashlights, extra batteries, blankets, backup battery packs, cash, and a manual can opener. Fill prescriptions before major storms.' },
          { title: 'Check Generator and Alternative Heat', frequency: 'Annual', notes: 'Test generator under load before winter. Stock fuel with stabilizer. Have an approved indoor-safe alternative heat source (propane heater with proper ventilation). Never use generators or charcoal indoors.' },
          { title: 'Inspect Foundation and Basement for Water Entry', frequency: 'Annual', notes: 'Check basement walls and floor for cracks before spring thaw. Apply waterproofing sealant to minor cracks. Ensure sump pump is working and has a battery backup for storm power outages.' },
        ],
      },
      northwest: {
        name: 'Pacific Northwest — Rain, Wind & Wildfire Prep',
        tips: 'The Pacific Northwest faces heavy rain and windstorms in winter and increasingly severe wildfire smoke in summer. Prepare for both wet and dry season threats.',
        tasks: [
          { title: 'Inspect Roof and Gutters Before Rainy Season', frequency: 'Annual', notes: 'Clean gutters each October before the rainy season begins. Check roof for missing shingles or damaged flashing. The PNW\'s heavy rainfall means clogged gutters quickly cause water intrusion and rot.' },
          { title: 'Check Sump Pump and Drainage', frequency: 'Annual', notes: 'Test sump pump each fall by pouring water into the pit. Ensure downspouts direct water at least 6 feet from the foundation. PNW soils can become saturated quickly, causing basement flooding.' },
          { title: 'Prepare for Wind Storms', frequency: 'Annual', notes: 'Trim dead branches and trees that overhang the home before fall. Secure outdoor furniture and decorations. Know which utility poles serve your home for faster outage reporting.' },
          { title: 'Stock Power Outage Emergency Kit', frequency: 'Annual', notes: 'PNW windstorms frequently knock out power for days. Stock: 3-7 day food and water supply, battery/hand-crank radio, flashlights, battery packs, propane camp stove for outdoor cooking, and extra blankets.' },
          { title: 'Wildfire Smoke Preparedness', frequency: 'Annual', notes: 'Each June, check that HVAC filters are rated MERV-13 or higher. Stock N95 respirators. Seal window gaps with weatherstripping. Know your local air quality index (AQI) resources. Create a clean room in the home.' },
          { title: 'Defensible Space for Wildfire Risk', frequency: 'Annual', notes: 'If in a wildfire-prone area (east of the Cascades or rural areas), clear 30 feet of defensible space around the home. Remove dead vegetation, wood piles near the house, and flammable decking materials.' },
          { title: 'Inspect and Seal Foundation for Moisture', frequency: 'Annual', notes: 'PNW homes are prone to moisture intrusion and mold. Check foundation walls and crawl space for dampness. Install a vapor barrier in crawl space if not present. Run a dehumidifier in damp areas.' },
          { title: 'Test and Clean Dryer Vent', frequency: 'Annual', notes: 'Lint buildup in dryer vents is a fire hazard, especially when homes are sealed tight in wet weather. Clean the entire vent run annually. Ensure the exterior vent cap opens and closes freely.' },
          { title: 'Check for Mold in Attic and Crawl Space', frequency: 'Annual', notes: 'PNW humidity makes attics and crawl spaces prime mold locations. Inspect each spring for black or white mold growth. Ensure attic vents are clear and crawl space has proper vapor barrier and ventilation.' },
          { title: 'Earthquake Preparedness Check', frequency: 'Annual', notes: 'The PNW sits on the Cascadia Subduction Zone. Strap water heater and heavy furniture to walls. Store a 2-week emergency supply. Know your drop-cover-hold-on plan. Have cash and important documents accessible.' },
        ],
      },
      southwest: {
        name: 'Southwest — Extreme Heat, Drought & Flash Flood Prep',
        tips: 'The Southwest faces extreme summer heat, drought conditions, flash floods, and dust storms (haboobs). Prepare your home for both scorching dry seasons and intense monsoon storms.',
        tasks: [
          { title: 'HVAC Pre-Summer Tune-Up', frequency: 'Annual', notes: 'Schedule AC service each March before summer heat hits. In Phoenix and surrounding areas, temperatures exceed 110°F — a failing AC is a life-safety emergency. Check refrigerant, coils, and capacitor.' },
          { title: 'Inspect and Clean Evaporative Cooler', frequency: 'Annual', notes: 'If using a swamp cooler, replace pads, clean the reservoir, and check the pump and motor each spring. Switch to AC when humidity rises during monsoon season (July-September) — swamp coolers don\'t work in humid conditions.' },
          { title: 'Monsoon Season Prep', frequency: 'Annual', notes: 'Before July monsoon season, clear gutters, check roof drainage, and inspect window and door seals. Monsoon storms produce intense rainfall that flat or low-slope roofs can\'t drain fast enough, causing ponding and leaks.' },
          { title: 'Flash Flood Awareness and Prep', frequency: 'Annual', notes: 'Know if your property is in a wash or flood-prone area (FEMA flood map). Never drive through flooded washes — "turn around, don\'t drown." Keep sandbags accessible if near a wash. Check drainage around the home.' },
          { title: 'Dust Storm (Haboob) Preparedness', frequency: 'Annual', notes: 'Seal gaps around windows and doors to minimize dust intrusion. Change HVAC filters after major dust storms. Keep a spare set of MERV-13 filters on hand. Replace cabin air filters in vehicles after haboob season.' },
          { title: 'Water Conservation and Irrigation Audit', frequency: 'Annual', notes: 'Southwest water restrictions are increasingly common. Audit your irrigation system for leaks and over-watering. Convert to drip irrigation and drought-tolerant landscaping. Know your municipality\'s current water restrictions.' },
          { title: 'Inspect Stucco and Exterior Walls', frequency: 'Annual', notes: 'Southwest homes are predominantly stucco. Inspect annually for cracks — intense heat and monsoon moisture cause expansion and contraction that leads to cracking. Fill small cracks with elastomeric caulk to prevent water intrusion.' },
          { title: 'Wildfire Defensible Space', frequency: 'Annual', notes: 'If in a wildland-urban interface area (foothills, rural areas), maintain 100 feet of defensible space. Remove dead vegetation, palm fronds, and wood piles near the home. Clear pine needles from roof and gutters.' },
          { title: 'Inspect Roof Coating and Flat Roof Drains', frequency: 'Annual', notes: 'Many Southwest homes have flat or low-slope roofs with elastomeric coatings. Inspect for bubbling, cracking, or peeling each spring. Clear roof drains before monsoon season to prevent ponding water, which leads to leaks and structural damage.' },
          { title: 'Heat Emergency Plan', frequency: 'Annual', notes: 'Know your nearest cooling center (public library, community center, mall). Have a plan for power outages during heat waves. Check on elderly neighbors. Keep at least a 3-day water supply (more than standard due to extreme heat).' },
        ],
      },
      west: {
        name: 'West / California — Wildfire, Earthquake & Drought Prep',
        tips: 'California homeowners face three major threats: wildfires, earthquakes, and prolonged drought. Preparing for all three requires year-round attention — fire season now runs nearly year-round in many areas.',
        tasks: [
          { title: 'Wildfire Defensible Space — Zone 1 (0-30 ft)', frequency: 'Annual', notes: 'Clear the area within 30 feet of the home of dead plants, dry leaves, and flammable materials. Keep grass mowed to 4 inches or less. Remove wood piles and propane tanks away from the structure. Cal Fire requires this by law in State Responsibility Areas.' },
          { title: 'Wildfire Defensible Space — Zone 2 (30-100 ft)', frequency: 'Annual', notes: 'In the 30-100 foot zone, space plants and trees to reduce fire spread. Remove ladder fuels (shrubs under trees). Keep debris cleared. This zone slows fire and gives firefighters room to work.' },
          { title: 'Harden Your Home Against Embers', frequency: 'Annual', notes: 'Ember intrusion — not direct flame — causes most home ignitions during wildfires. Install 1/16-inch mesh screens on all vents and eaves. Replace wood decking with composite or concrete. Clear gutters and install gutter guards. Check roof and walls for gaps.' },
          { title: 'Create a Go Bag and Evacuation Plan', frequency: 'Annual', notes: 'Prepare a go bag with: copies of important documents, medications (2-week supply), cash, phone chargers, change of clothes, and water. Know your evacuation routes and sign up for county emergency alerts (e.g., AlertSCC, AlertSF, Nixle).' },
          { title: 'Earthquake Preparedness', frequency: 'Annual', notes: 'Strap water heater, refrigerator, and tall furniture to walls. Store 2 weeks of food and water. Know how to shut off gas at the meter (keep wrench nearby). Bolt the home to its foundation if not already done (cripple wall or soft-story retrofit).' },
          { title: 'Check Earthquake Gas Shutoff Valve', frequency: 'Annual', notes: 'Consider installing an automatic seismic gas shutoff valve if not already present. After any significant earthquake, inspect for gas leaks by smell before re-entering. Know location of the manual shutoff and keep a wrench accessible.' },
          { title: 'Drought and Water Conservation Audit', frequency: 'Annual', notes: 'Check for leaks in irrigation system and indoor plumbing. Convert to drought-tolerant landscaping. Know your water district\'s current stage restrictions. Install a smart irrigation controller that adjusts for rainfall and evapotranspiration.' },
          { title: 'Air Quality — Wildfire Smoke Plan', frequency: 'Annual', notes: 'Stock N95 respirators for each family member. Upgrade HVAC filter to MERV-13. Designate a "clean room" with a portable air purifier (HEPA). Know how to recirculate air in your car. Monitor AirNow.gov during fire events.' },
          { title: 'Inspect Chimney and Clear Roof of Debris', frequency: 'Annual', notes: 'Have chimney professionally cleaned before fire season. Clear pine needles, leaves, and debris from roof and gutters — these are prime ignition points for ember showers. Install metal spark arrestor cap on chimney.' },
          { title: 'Review Homeowner\'s Insurance for Fire Coverage', frequency: 'Annual', notes: 'Many California insurers have pulled out of high-risk areas. Verify your policy is active and covers wildfire at full replacement cost. If dropped, explore the FAIR Plan as a last resort. Document all belongings with video annually.' },
        ],
      },
    },
  },
}
