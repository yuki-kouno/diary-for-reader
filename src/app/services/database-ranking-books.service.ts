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
      .doc<RankingBook>(`bookRanking/overall`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getBusinessesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/business`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getHumanitiesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/humanity`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getliteraturesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/literature`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getComicsRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/comic`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getHobbiesRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/hobby`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
  getNweReleaseRanking(): Observable<RankingBooksInfo[]> {
    return this.db
      .doc<RankingBook>(`bookRanking/new`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.rankingBooksInfo;
        })
      );
  }
}
