import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Book } from '../interface/book';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class DatabaseBooksService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions
  ) {}

  async createFavoriteBook(book: Book): Promise<void> {
    const uid = this.authService.uid;
    return this.db
      .doc(`users/${this.authService.uid}/favoriteBooks/${book.id}`)
      .set({
        ...book,
        uid,
        createdAt: firestore.Timestamp.now(),
      })
      .then(() => {
        this.snackBar.open(
          `${book.volumeInfo.title}
          をライブラリに追加しました`
        );
      });
  }

  getFavoriteBooks(sort: string, order: any): Observable<Book[]> {
    return this.db
      .collection<Book>(
        `users/${this.authService.uid}/favoriteBooks`,
        (ref) => {
          return ref.orderBy(sort, order);
        }
      )
      .valueChanges()
      .pipe(shareReplay(1));
  }

  checkFavoriteBookExists(): Observable<Book[]> {
    return this.db
      .collection<Book>(
        `users/${this.authService.uid}/favoriteBooks`,
        (ref) => {
          return ref.limit(1);
        }
      )
      .valueChanges()
      .pipe(shareReplay(1));
  }

  getFavoriteBook(id: string): Observable<Book> {
    return this.db
      .doc<Book>(`users/${this.authService.uid}/favoriteBooks/${id}`)
      .valueChanges()
      .pipe(shareReplay(1));
  }

  getFavoriteBookIds(): Observable<string[]> {
    return this.db
      .collection<Book>(`users/${this.authService.uid}/favoriteBooks`)
      .valueChanges()
      .pipe(
        map((books) => books.map((book) => book.id)),
        shareReplay(1)
      );
  }

  async removeFavoriteBook(id: string): Promise<void> {
    this.db.doc(`users/${this.authService.uid}/favoriteBooks/${id}`).delete();
    return this.deleteReviews(id);
  }

  async deleteReviews(id: string): Promise<void> {
    const callable = this.fns.httpsCallable('deleteReviews');
    return callable(id).toPromise();
  }
}
