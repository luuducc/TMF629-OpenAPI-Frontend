import type { PrimeVueSeverity } from "./prime-vue-severity";
export enum StatusType {
  Draft = 'Draft',
  Created = 'Created',
  Pending = 'Pending',
  Verified = 'Verified',
  Active = 'Active',
  Suspended = 'Suspended',
  Inactive = 'Inactive',
  Archived = 'Archived',
  Blacklisted = 'Blacklisted',
  Rejected = 'Rejected',
  Deleted = 'Deleted',
}

export const statusOptions: { name: string; type: StatusType }[] =
  Object.values(StatusType).map((status) => ({
    name: status,
    type: status,
  }))

export const getStatusSeverity = (status: StatusType | undefined): PrimeVueSeverity => {
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
