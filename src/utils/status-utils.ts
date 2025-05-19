import type { PrimeVueSeverity } from '@/types'
import { StatusType } from '@/types'

export const getSeverity = (status: StatusType | undefined): PrimeVueSeverity => {
  switch (status) {
    case StatusType.Draft:
    case StatusType.Inactive:
    case StatusType.Archived:
      return 'secondary'

    case StatusType.Created:
    case StatusType.Pending:
      return 'info'

    case StatusType.Verified:
    case StatusType.Active:
      return 'success'

    case StatusType.Suspended:
      return 'warn'

    case StatusType.Blacklisted:
    case StatusType.Rejected:
    case StatusType.Deleted:
      return 'danger'

    default:
      return 'secondary' // fallback
  }
}