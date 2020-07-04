import { Book } from './book';

export interface Review {
  createdAt?: Date;
  reviewId: string;
  title: string;
  question: string;
  text: string;
}
