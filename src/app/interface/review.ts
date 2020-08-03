import { firestore } from 'firebase';

export interface Review {
  id: string;
  createdDate: string;
  createdAt: firestore.Timestamp;
  title: string;
  question: string;
  answer: string;
}
