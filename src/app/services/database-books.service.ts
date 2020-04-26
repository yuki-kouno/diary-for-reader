import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Book } from '../interface/book';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class DatabaseBooksService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  addBook(book: Book): Promise<void> {
    return this.db
      .collection(`users/${this.authService.uid}/favoriteBooks`)
      .add(book)
      .then(() => {
        console.log(`${book.volumeInfo.title}を保存しました`);
      });
  }

  // getBook(): Observable<User> {
  //   return this.db
  //   .collection<User>('users', ref => ref.where('UID', '==', 'UID'))
  // }
}
//   getArticles(): Observable<Article[]> {
//     return this.db.collection<Article>('articles', ref => {
//       // 受け取るアイテムの条件や量を指定する
//       return ref.limit(4); // 4件のみ取得する
//     }).valueChanges();
//   }
// }
