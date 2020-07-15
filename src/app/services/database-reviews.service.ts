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
  date = this.datePipe.transform(this.nowDate, 'yyyyMMdd');

  getReviews(): Observable<Review[]> {
    return this.db
      .collection<Review>(
        `users/${this.authService.uid}/favoriteBooks/'-L8_DwAAQBAJ'
    /reviews`,
        (ref) => {
          return ref
            .where('createdDate', '==', `${this.date}`)
            .orderBy('createdAt', 'desc');
        }
      )
      .valueChanges();
  }

  createReview(book: Book, review: Review): Promise<void> {
    const reviewId = this.db.createId();
    return this.db
      .doc(
        `users/${this.authService.uid}/favoriteBooks/${book.id}
      /reviews/${reviewId}`
      )
      .set({
        reviewId,
        ...review,
        createdDate: this.date,
        createdAt: firestore.Timestamp.now(),
      });
  }

  updateReview() {}

  deleteReview() {}
}
