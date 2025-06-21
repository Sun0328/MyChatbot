import { toast } from "sonner"

// Custom toast functions with predefined styles
export const customToast = {
  error: (message, options = {}) => {
    return toast.error(message, {
      icon: "⚠️",
      style: {
        background: '#ef4444',
        color: 'white',
        border: '1px solid #dc2626',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
        fontWeight: '500',
        ...options.style
      },
      ...options
    })
  },
  
  success: (message, options = {}) => {
    return toast.success(message, {
      icon: "✅",
      style: {
        background: '#10b981',
        color: 'white',
        border: '1px solid #059669',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        fontWeight: '500',
        ...options.style
      },
      ...options
    })
  },
  
  warning: (message, options = {}) => {
    return toast.warning(message, {
      icon: "⚠️",
      style: {
        background: '#f59e0b',
        color: 'white',
        border: '1px solid #d97706',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
        fontWeight: '500',
        ...options.style
      },
      ...options
    })
  }
} 