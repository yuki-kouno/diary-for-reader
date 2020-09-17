import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RankingBook } from '../interface/ranking-book';

@Injectable({
  providedIn: 'root',
})
export class DatabaseRankingBooksService {
  constructor(private db: AngularFirestore) {}

  getRankingBooks(): Observable<RankingBook> {
    return this.db
      .doc<RankingBook>(`bookRanking/本 の 売れ筋ランキング`)
      .valueChanges();
  }
}
