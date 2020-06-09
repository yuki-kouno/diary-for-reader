import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Book } from '../interface/book';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class DatabaseBooksService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  createToFavoriteBook(book: Book): Promise<void> {
    const bookId = this.db.createId(); // IDを生成
    return this.db
      .doc(`users/${this.authService.uid}/favoriteBooks/${bookId}`)
      .set({
        bookId, // ドキュメントの内容にIDを持たせる
        ...book,
        craetedAt: firestore.Timestamp.now(), // firestore形式のタイムスタンプを追加
      });
  }

  getToFavoriteBooks(): Observable<Book[]> {
    return this.db
      .collection<Book>(`users/${this.authService.uid}/favoriteBooks`)
      .valueChanges();
  }

  getToFavoriteBook(bookId: string): Observable<Book> {
    return this.db
      .doc<Book>(`users/${this.authService.uid}/favoriteBooks/${bookId}`)
      .valueChanges();
  }

  removeToFavoriteBook(bookId: string): Promise<void> {
    return this.db
      .doc(`users/${this.authService.uid}/favoriteBooks/${bookId}`)
      .delete();
  }
}
