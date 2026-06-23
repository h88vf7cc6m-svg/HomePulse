import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setTasks(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const addTask = async (taskObj) => {
    setError(null)
    const { data: userData } = await supabase.auth.getUser()
    const { error: insertError } = await supabase.from('tasks').insert({
      ...taskObj,
      user_id: userData?.user?.id,
    })

    if (insertError) {
      setError(insertError.message)
      return { error: insertError }
    }

    await refetch()
    return { error: null }
  }

  const toggleComplete = async (id, current) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !current } : t))
    )

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ completed: !current })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: current } : t))
      )
    }
  }

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      await refetch()
    }
  }

  return { tasks, loading, error, addTask, toggleComplete, deleteTask, refetch }
}
