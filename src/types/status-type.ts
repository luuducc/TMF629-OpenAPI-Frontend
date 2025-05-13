export enum StatusType {
  Draft = 'Draft',              // secondary
  Created = 'Created',          // info
  Pending = 'Pending',          // info
  Verified = 'Verified',        // success
  Active = 'Active',            // success
  Suspended = 'Suspended',      // warn
  Inactive = 'Inactive',        // secondary
  Archived = 'Archived',        // secondary
  Blacklisted = 'Blacklisted',  // danger
  Rejected = 'Rejected',        // danger
  Deleted = 'Deleted'           // danger
}