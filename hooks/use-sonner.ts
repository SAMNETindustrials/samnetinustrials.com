"use client"

import { toast as sonnerToast } from "sonner"

type ToastOptions = {
  title?: string
  description?: string
  duration?: number
}

function toast({
  title,
  description,
  duration,
}: ToastOptions) {
  if (title && description) {
    sonnerToast(title, {
      description,
      duration,
    })
    return
  }

  if (title) {
    sonnerToast(title, { duration })
    return
  }

  if (description) {
    sonnerToast(description, { duration })
  }
}

toast.success = (message: string, options?: { duration?: number }) =>
  sonnerToast.success(message, options)

toast.error = (message: string, options?: { duration?: number }) =>
  sonnerToast.error(message, options)

toast.info = (message: string, options?: { duration?: number }) =>
  sonnerToast.info(message, options)

toast.warning = (message: string, options?: { duration?: number }) =>
  sonnerToast.warning(message, options)

toast.promise = sonnerToast.promise

export { toast }
