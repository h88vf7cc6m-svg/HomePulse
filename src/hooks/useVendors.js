import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setVendors(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const addVendor = async (vendorObj) => {
    setError(null)
    const { data: userData } = await supabase.auth.getUser()
    const { error: insertError } = await supabase.from('vendors').insert({
      ...vendorObj,
      user_id: userData?.user?.id,
    })

    if (insertError) {
      setError(insertError.message)
      return { error: insertError }
    }

    await refetch()
    return { error: null }
  }

  const deleteVendor = async (id) => {
    setVendors((prev) => prev.filter((v) => v.id !== id))
    const { error: deleteError } = await supabase.from('vendors').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      await refetch()
    }
  }

  return { vendors, loading, error, addVendor, deleteVendor, refetch }
}
