import { StatusType } from '@/types'

export default [
  { id: 1, name: 'Alice Nguyen', description: 'New draft entry', status: StatusType.Draft },
  { id: 2, name: 'Bob Tran', description: 'Account created but not yet active', status: StatusType.Created },
  { id: 3, name: 'Charlie Le', description: 'Waiting for verification', status: StatusType.Pending },
  { id: 4, name: 'Diana Pham', description: 'Verified identity', status: StatusType.Verified },
  { id: 5, name: 'Ethan Vo', description: 'Currently active customer', status: StatusType.Active },
  { id: 6, name: 'Fiona Do', description: 'Temporarily suspended due to inactivity', status: StatusType.Suspended },
  { id: 7, name: 'George Bui', description: 'No activity for 6 months', status: StatusType.Inactive },
  { id: 8, name: 'Hannah Phan', description: 'Archived after project closure', status: StatusType.Archived },
  { id: 9, name: 'Ian Ly', description: 'Blacklisted due to policy violation', status: StatusType.Blacklisted },
  { id: 10, name: 'Jenny Ha', description: 'Registration rejected due to invalid info', status: StatusType.Rejected },
  { id: 11, name: 'Kevin Dao', description: 'Account deleted by request', status: StatusType.Deleted },
  { id: 12, name: 'Linda Vo', description: 'Recently signed up', status: StatusType.Created },
  { id: 13, name: 'Michael Ngo', description: 'Suspended for billing issue', status: StatusType.Suspended },
  { id: 14, name: 'Nina Ho', description: 'Old inactive customer', status: StatusType.Inactive },
  { id: 15, name: 'Oscar Quach', description: 'Currently using services', status: StatusType.Active },
  { id: 16, name: 'Pauline Vu', description: 'Blacklisted for abuse', status: StatusType.Blacklisted },
  { id: 17, name: 'Quang Nguyen', description: 'Account verified successfully', status: StatusType.Verified },
  { id: 18, name: 'Rita Lam', description: 'Draft created, pending input', status: StatusType.Draft },
  { id: 19, name: 'Steve Dinh', description: 'Requested account deletion', status: StatusType.Deleted },
  { id: 20, name: 'Tina Trinh', description: 'Recently archived', status: StatusType.Archived }
]
