import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Book } from '../interface/book';

import { Observable } from 'rxjs';

import { firestore } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseBooksService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  createToFavoriteBook(book: Book): Promise<void> {
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
          `${book.volumeInfo.title}`,
          'をライブラリに追加したよ',
          {
            duration: 2000,
          }
        );
      });
  }

  getToFavoriteBooks(): Observable<Book[]> {
    return this.db
      .collection<Book>(
        `users/${this.authService.uid}/favoriteBooks`,
        (ref) => {
          return ref.orderBy('createdAt', 'desc');
        }
      )
      .valueChanges();
  }

  getToFavoriteBook(id): Observable<Book> {
    return this.db
      .doc<Book>(`users/${this.authService.uid}/favoriteBooks/${id}`)
      .valueChanges();
  }

  getToFavoriteBookIds(): Observable<string[]> {
    return this.db
      .collection<Book>(`users/${this.authService.uid}/favoriteBooks`)
      .valueChanges()
      .pipe(map((books) => books.map((book) => book.id)));
  }

  removeToFavoriteBook(id): Promise<void> {
    return this.db
      .doc(`users/${this.authService.uid}/favoriteBooks/${id}`)
      .delete();
  }
}
