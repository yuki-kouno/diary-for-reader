import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Book } from '../interface/book';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseBooksService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  addToFavoriteBook(book: Book): Promise<void> {
    return this.db
      .collection(`users/${this.authService.uid}/favoriteBooks`)
      .add(book)
      .then(() => {
        console.log(`${book.volumeInfo.title}を保存しました`);
      });
  }

  getToFavoriteBook(): Observable<Book[]> {
    return this.db
      .collection<Book>(`users/${this.authService.uid}/favoriteBooks`)
      .valueChanges()
      .pipe(tap((result) => console.log(result)));
  }
}
