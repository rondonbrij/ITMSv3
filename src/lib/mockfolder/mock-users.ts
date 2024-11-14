
import { User } from '../../types/types';
import { mockTransportCompanies } from './mock-transport-companies';

export const mockUsers: User[] = [
  {
    id: 1,
    username: "admin_user",
    email: "admin@itms.com",
    role: "admin",
    permissions_level: 3,
    transport_company: null,
    backup_email: "admin_backup@itms.com",
    backup_phone: "+63 912 345 6789"
  },
  // ...add 9 more similar user records
];