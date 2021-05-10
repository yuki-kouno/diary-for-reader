import { firestore } from 'firebase';

export interface Review {
  bookId: string;
  thumbnail: string;
  uid: string;
  id: string;
  createdDate: string;
  createdAt: firestore.Timestamp;
  title: string;
  question: string;
  answer: string;
  dialogTitle?: string;
  data?: [
    {
      question: string;
      answer: string;
    }
  ];
}
