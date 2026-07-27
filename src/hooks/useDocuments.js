import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const BUCKET = 'documents'

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export function useDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setDocuments(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const uploadDocument = async (file, category, title) => {
    setError(null)
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) {
      const err = { message: 'You must be signed in to upload a document.' }
      setError(err.message)
      return { error: err }
    }

    const path = `${userId}/${category}/${Date.now()}_${sanitizeFileName(file.name)}`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file)
    if (uploadError) {
      setError(uploadError.message)
      return { error: uploadError }
    }

    const { error: insertError } = await supabase.from('documents').insert({
      user_id: userId,
      category,
      title: title || null,
      file_name: file.name,
      file_path: path,
      file_size: file.size,
      mime_type: file.type || null,
    })

    if (insertError) {
      await supabase.storage.from(BUCKET).remove([path])
      setError(insertError.message)
      return { error: insertError }
    }

    await refetch()
    return { error: null }
  }

  const getDownloadUrl = async (filePath) => {
    const { data, error: urlError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(filePath, 60)
    if (urlError) {
      setError(urlError.message)
      return null
    }
    return data?.signedUrl || null
  }

  const deleteDocument = async (doc) => {
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id))
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([doc.file_path])
    if (storageError) {
      setError(storageError.message)
      await refetch()
      return
    }
    const { error: deleteError } = await supabase.from('documents').delete().eq('id', doc.id)
    if (deleteError) {
      setError(deleteError.message)
      await refetch()
    }
  }

  return { documents, loading, error, uploadDocument, getDownloadUrl, deleteDocument, refetch }
}
