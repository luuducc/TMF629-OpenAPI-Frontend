export enum StatusType {
  Draft = 0,          // secondary
  Created = 1,        // info
  Pending = 2,        // info
  Verified = 3,       // success
  Active = 4,         // success
  Suspended = 5,      // warn
  Inactive = 6,       // secondary
  Archived = 7,       // secondary
  Blacklisted = 8,    // danger
  Rejected = 9,       // danger
  Deleted = 10        // danger
}

export const statusMap: Record<StatusType, string> = {
  [StatusType.Draft]: 'Draft',
  [StatusType.Created]: 'Created',
  [StatusType.Pending]: 'Pending',
  [StatusType.Verified]: 'Verified',
  [StatusType.Active]: 'Active',
  [StatusType.Suspended]: 'Suspended',
  [StatusType.Inactive]: 'Inactive',
  [StatusType.Archived]: 'Archived',
  [StatusType.Blacklisted]: 'Blacklisted',
  [StatusType.Rejected]: 'Rejected',
  [StatusType.Deleted]: 'Deleted'
} as const