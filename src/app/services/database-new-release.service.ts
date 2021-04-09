import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewRelease } from '../interface/new-release';
import { NewReleaseInfo } from '../interface/new-release-info';

@Injectable({
  providedIn: 'root',
})
export class DatabaseNewReleaseService {
  constructor(private db: AngularFirestore) {}

  getComicDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/comic`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
  getBusinessDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/business`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
  getItDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/it`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
  getLifeDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/life`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
  getLiteratureDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/literature`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
  getLightNovelDatas(): Observable<NewReleaseInfo[]> {
    return this.db
      .doc<NewRelease>(`newRelease/lightnovel`)
      .valueChanges()
      .pipe(
        map((data) => {
          return data.releaseData;
        })
      );
  }
}
