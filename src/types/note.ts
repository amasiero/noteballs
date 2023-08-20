import { Timestamp } from 'firebase/firestore';

export interface Note {
  id: string;
  content: string;
  createdAt: Timestamp;
}
