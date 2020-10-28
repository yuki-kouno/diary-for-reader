import { firestore } from 'firebase';

export interface Review {
  uid: string;
  id: string;
  createdDate: string;
  createdAt: firestore.Timestamp;
  title: string;
  question: string;
  answer: string;
}
