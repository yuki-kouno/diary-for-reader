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

  setBook(data: Book) {
    return this.db
      .doc('users/' + this.authService.uid)
      .set(data)
      .then(() => {
        console.log(`${data.volumeInfo.title}を保存しました`);
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
