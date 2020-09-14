import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class BookRankingScrapingService {
  constructor(private fns: AngularFireFunctions) {}

  bookRankingScraping(): Promise<void> {
    const callable = this.fns.httpsCallable('getBookInfo');
    return callable({}).toPromise();
  }
}
