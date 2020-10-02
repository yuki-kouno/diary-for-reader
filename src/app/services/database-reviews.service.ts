import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Review } from '../interface/review';
import { firestore } from 'firebase/app';
import { Book } from '../interface/book';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseReviewsService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    public datePipe: DatePipe
  ) {}

  nowDate = new Date();
  DATE_FORMAT = 'yyyyMMdd';

  getReviews(bookId): Observable<Review[]> {
    const createdDate = this.datePipe.transform(new Date(), this.DATE_FORMAT);
    return this.db
      .collection<Review>(
        `users/${this.authService.uid}/favoriteBooks/${bookId}/reviews`,
        (ref) => {
          return ref
            .where('createdDate', '==', createdDate)
            .orderBy('createdAt');
        }
      )
      .valueChanges();
  }

  getAllReviews(bookId): Observable<Review[]> {
    return this.db
      .collection<Review>(
        `users/${this.authService.uid}/favoriteBooks/${bookId}/reviews`,
        (ref) => {
          return ref.orderBy('createdAt');
        }
      )
      .valueChanges();
  }

  createReview(
    book: Book,
    review: Omit<Review, 'id' | 'createdDate' | 'createdAt'>
  ): Promise<void> {
    const id: string = this.db.createId();
    const createdDate = this.datePipe.transform(new Date(), this.DATE_FORMAT);
    return this.db
      .doc<Review>(
        `users/${this.authService.uid}/favoriteBooks/${book.id}/reviews/${id}`
      )
      .set({
        ...review,
        id,
        createdDate,
        createdAt: firestore.Timestamp.now(),
      });
  }

  updateReview(
    book: Book,
    review: Omit<Review, 'createdDate' | 'createdAt' | 'title' | 'question'>
  ) {
    return this.db
      .doc(
        `users/${this.authService.uid}/favoriteBooks/${book.id}/reviews/${review.id}`
      )
      .update({ answer: review.answer });
  }

  deleteReview(book: Book, review: Review): Promise<void> {
    return this.db
      .doc<Review>(
        `users/${this.authService.uid}/favoriteBooks/${book.id}/reviews/${review.id}`
      )
      .delete();
  }
}
