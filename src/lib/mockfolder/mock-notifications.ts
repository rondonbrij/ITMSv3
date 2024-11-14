
import { Notification } from '../../types/types';
import { mockUsers } from './mock-users';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    user: mockUsers[0],
    message: "New booking received for Trip #123",
    seen: false,
    created_at: "2024-01-15T09:00:00Z"
  },
  // ...add 9 more similar notification records
];