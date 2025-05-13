import { StatusType } from '@/types'

export default [
  { _id: '66423a1e3f1a2c6b1a7a0011', name: 'Alice Nguyen', description: 'New draft entry', status: StatusType.Draft },
  { _id: '66423a1e3f1a2c6b1a7a0012', name: 'Bob Tran', description: 'Account created but not yet active', status: StatusType.Created },
  { _id: '66423a1e3f1a2c6b1a7a0013', name: 'Charlie Le', description: 'Waiting for verification', status: StatusType.Pending },
  { _id: '66423a1e3f1a2c6b1a7a0014', name: 'Diana Pham', description: 'Verified identity', status: StatusType.Verified },
  { _id: '66423a1e3f1a2c6b1a7a0015', name: 'Ethan Vo', description: 'Currently active customer', status: StatusType.Active },
  { _id: '66423a1e3f1a2c6b1a7a0016', name: 'Fiona Do', description: 'Temporarily suspended due to inactivity', status: StatusType.Suspended },
  { _id: '66423a1e3f1a2c6b1a7a0017', name: 'George Bui', description: 'No activity for 6 months', status: StatusType.Inactive },
  { _id: '66423a1e3f1a2c6b1a7a0018', name: 'Hannah Phan', description: 'Archived after project closure', status: StatusType.Archived },
  { _id: '66423a1e3f1a2c6b1a7a0019', name: 'Ian Ly', description: 'Blacklisted due to policy violation', status: StatusType.Blacklisted },
  { _id: '66423a1e3f1a2c6b1a7a0020', name: 'Jenny Ha', description: 'Registration rejected due to invalid info', status: StatusType.Rejected },
  { _id: '66423a1e3f1a2c6b1a7a0021', name: 'Kevin Dao', description: 'Account deleted by request', status: StatusType.Deleted },
  { _id: '66423a1e3f1a2c6b1a7a0022', name: 'Linda Vo', description: 'Recently signed up', status: StatusType.Created },
  { _id: '66423a1e3f1a2c6b1a7a0023', name: 'Michael Ngo', description: 'Suspended for billing issue', status: StatusType.Suspended },
  { _id: '66423a1e3f1a2c6b1a7a0024', name: 'Nina Ho', description: 'Old inactive customer', status: StatusType.Inactive },
  { _id: '66423a1e3f1a2c6b1a7a0025', name: 'Oscar Quach', description: 'Currently using services', status: StatusType.Active },
  { _id: '66423a1e3f1a2c6b1a7a0026', name: 'Pauline Vu', description: 'Blacklisted for abuse', status: StatusType.Blacklisted },
  { _id: '66423a1e3f1a2c6b1a7a0027', name: 'Quang Nguyen', description: 'Account verified successfully', status: StatusType.Verified },
  { _id: '66423a1e3f1a2c6b1a7a0028', name: 'Rita Lam', description: 'Draft created, pending input', status: StatusType.Draft },
  { _id: '66423a1e3f1a2c6b1a7a0029', name: 'Steve Dinh', description: 'Requested account deletion', status: StatusType.Deleted },
  { _id: '66423a1e3f1a2c6b1a7a0030', name: 'Tina Trinh', description: 'Recently archived', status: StatusType.Archived }
];
