import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBer: MatSnackBar
    ) {
    this.afUser$.subscribe(user => console.log(user));
  }

  login() {
    this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider()
    ).then(() => {
      this.router.navigateByUrl('/review');
    }).then(() => {
      this.snackBer.open('ようこそ', null, {
        duration: 2000,
      });
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/welcome').then(() => {
      this.snackBer.open('ログアウトしました', null, {
        duration: 2000,
      });
    });
  }
}
