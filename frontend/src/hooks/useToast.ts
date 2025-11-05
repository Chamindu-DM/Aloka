import { useState } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = { id, message, type }
    
    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (message: string) => showToast(message, 'success')
  const error = (message: string) => showToast(message, 'error')
  const info = (message: string) => showToast(message, 'info')
  const warning = (message: string) => showToast(message, 'warning')

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}
