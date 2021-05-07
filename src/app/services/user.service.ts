import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid: string;
  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((user) => {
      if (user) {
        this.uid = user.uid;
        return this.getUserByID(this.uid);
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions,
    private authService: AuthService,
    private loadingSercvice: LoadingService
  ) {}

  getUserByID(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  getUserWithSnapShot(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }

  async deleteUser(): Promise<void> {
    if (this.authService.uid === 'V4RMoLLIeFVzS0GCj7nOU2OIHXQ2') {
      this.loadingSercvice.loading = true;
      const callable = this.fns.httpsCallable('resetGuestDataByClient');
      return callable(this.authService.uid)
        .toPromise()
        .then(() => {
          this.router.navigateByUrl('/welcome');
          this.snackBar.open('ご利用ありがとうございました');
        })
        .catch((err) => {
          console.log(err);
          this.snackBar.open(
            '削除に失敗しました。もう一度退会を実行してください'
          );
        })
        .finally(() => {
          this.loadingSercvice.loading = false;
        });
    } else {
      this.loadingSercvice.loading = true;
      const callable = this.fns.httpsCallable('deleteAfUser');
      return callable(this.authService.uid)
        .toPromise()
        .then(() => {
          this.router.navigateByUrl('/welcome');
          this.snackBar.open('ご利用ありがとうございました');
        })
        .catch((err) => {
          console.log(err);
          this.snackBar.open(
            '削除に失敗しました。もう一度退会を実行してください'
          );
        })
        .finally(() => {
          this.loadingSercvice.loading = false;
        });
    }
  }

  updateUserTour(value: any): void {
    this.db.doc<User>(`users/${this.uid}`).update({
      ...value,
    });
  }
}
