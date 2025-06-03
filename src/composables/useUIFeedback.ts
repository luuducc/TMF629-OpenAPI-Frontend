// composables/useToastService.ts
import { useConfirm, useToast } from 'primevue'

export function useToastService() {
  const toast = useToast()

  const show = (
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast',
    summary: string,
    detail: string
  ) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
    })
  }

  return {
    success: (summary: string, detail: string) => show('success', summary, detail),
    info: (summary: string, detail: string) => show('info', summary, detail),
    warn: (summary: string, detail: string) => show('warn', summary, detail),
    danger: (summary: string, detail: string) => show('error', summary, detail),
    secondary: (summary: string, detail: string) => show('secondary', summary, detail),
    contrast: (summary: string, detail: string) => show('contrast', summary, detail),
  }
}

export function useConfirmationService() {
  const confirm = useConfirm()
  const danger = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      confirm.require({
        message,
        header: 'Danger Zone',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
          size: 'small',
        },
        acceptProps: {
          label: 'Delete',
          severity: 'danger',
          size: 'small',
        },
        accept: () => resolve(true),
        reject: () => resolve(false),
      })
    })
  }
  return { danger }
}
