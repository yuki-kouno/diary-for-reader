import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RankingBook } from '../interface/ranking-book';
import { map } from 'rxjs/operators';
import { RankingBooksInfo } from '../interface/ranking-books-info';

@Injectable({
  providedIn: 'root',
})
export class DatabaseRankingBooksService {
  constructor(private db: AngularFirestore) {}

  getBooksRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/本 の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getBusinessesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/ビジネス・経済 の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getHumanitiesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/人文・思想 の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getliteraturesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/文学・評論 の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getComicsRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/コミック の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getHobbiesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/趣味・実用 の 売れ筋ランキング`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
}
