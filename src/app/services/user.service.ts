import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private fns: AngularFireFunctions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getUserByID(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  getUserWithSnapShot(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }

  async deleteUser(): Promise<void> {
    const callable = this.fns.httpsCallable('deleteAfUser');
    const user: User = await this.getUserWithSnapShot();

    return callable(user)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('/welcome');
        this.snackBar.open('ご利用ありがとうございました');
      });
  }
}
