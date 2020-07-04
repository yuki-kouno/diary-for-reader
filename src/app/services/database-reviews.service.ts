import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Review } from '../interface/review';
import { firestore } from 'firebase/app';
import { Book } from '../interface/book';

@Injectable({
  providedIn: 'root',
})
export class DatabaseReviewsService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  getReview() {}

  getReviews() {}

  createReview(book: Book, review: Review): Promise<void> {
    const reviewId = this.db.createId();
    return this.db
      .doc(
        `users/${this.authService.uid}/favoriteBooks/${book.id}
      /reviews/${review.createdAt}`
      )
      .set({
        reviewId,
        ...review,
        createdAt: firestore.Timestamp.now(),
      });
  }

  updateReview() {}

  deleteReview() {}
}
