import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Review } from '../interface/review';
import { firestore } from 'firebase/app';
import { Book } from '../interface/book';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseReviewsService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    public datePipe: DatePipe
  ) {}

  nowDate: Date = new Date();
  DATE_FORMAT = 'yyyyMMdd';

  getReviews(bookId: string): Observable<Review[]> {
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
      .valueChanges()
      .pipe(shareReplay(1));
  }

  getAllReviews(bookId: string, order: any): Observable<Review[]> {
    return this.db
      .collection<Review>(
        `users/${this.authService.uid}/favoriteBooks/${bookId}/reviews`,
        (ref) => {
          return ref.orderBy('createdAt', order);
        }
      )
      .valueChanges()
      .pipe(shareReplay(1));
  }

  getReviewsOfAllBooks(): Observable<Review[]> {
    const uid = this.authService.uid;
    return this.db
      .collectionGroup<Review>(`reviews`, (ref) => {
        return ref.where('uid', '==', uid).orderBy('createdAt', 'asc');
      })
      .valueChanges()
      .pipe(shareReplay(1));
  }

  checkReviewExists(): Observable<Review[]> {
    const uid = this.authService.uid;
    return this.db
      .collectionGroup<Review>(`reviews`, (ref) => {
        return ref.where('uid', '==', uid).limit(1);
      })
      .valueChanges()
      .pipe(shareReplay(1));
  }

  createReview(
    book: Book,
    review: Omit<
      Review,
      'id' | 'createdDate' | 'createdAt' | 'uid' | 'bookId' | 'thumbnail'
    >
  ): Promise<void> {
    const thumbnail: string = book.volumeInfo.imageLinks.thumbnail;
    const bookId: string = book.id;
    const uid: string = this.authService.uid;
    const id: string = this.db.createId();
    const createdDate = this.datePipe.transform(new Date(), this.DATE_FORMAT);
    return this.db
      .doc<Review>(
        `users/${this.authService.uid}/favoriteBooks/${book.id}/reviews/${id}`
      )
      .set({
        ...review,
        thumbnail,
        bookId,
        uid,
        id,
        createdDate,
        createdAt: firestore.Timestamp.now(),
      });
  }

  updateReview(
    book: Book,
    review: Omit<
      Review,
      | 'createdDate'
      | 'createdAt'
      | 'title'
      | 'question'
      | 'uid'
      | 'bookId'
      | 'thumbnail'
    >
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
