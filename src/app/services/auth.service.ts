import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBer: MatSnackBar,
    private db: AngularFirestore,
    private userService: UserService,
    private afStore: AngularFirestore
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user && user.uid;
    });
  }

  createUser(params: { email: string; password: string }) {
    this.afAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((result) => {
        result.user.sendEmailVerification();
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('このアドレスは既に登録されています。');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('このメールアドレスのユーザーは見つかりません');
          break;
        case 'auth/wrong-password':
          alert('パスワードが間違っています');
          break;
        case 'auth/invalid-email':
          alert('メールアドレスが不正です');
          break;
      }
    });
  }

  login(params: { email: string; password: string }) {
    return this.afAuth
      .signInWithEmailAndPassword(params.email, params.password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('このメールアドレスのユーザーは見つかりません');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      })
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  googleLogin() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .then(() => {
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
