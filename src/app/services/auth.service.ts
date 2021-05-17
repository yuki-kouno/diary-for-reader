import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { shareReplay, take } from 'rxjs/operators';
import { LoadingService } from './loading.service';

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
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user && user.uid;
    }),
      shareReplay(1);
  }

  isProcessing: boolean;

  async createUser(params: { email: string; password: string }): Promise<void> {
    this.isProcessing = true;
    this.afAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((result) => {
        result.user.sendEmailVerification();
      })
      .finally(() => {
        this.router.navigate(['/welcome']);
        alert(
          'メールを送信しました。ログインするにはメールアドレスの確認を完了してください。'
        );
      })
      .catch((error) => {
        this.isProcessing = false;
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('このアドレスは既に登録されています。');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
    this.isProcessing = false;
  }

  async resetPassword(email: string): Promise<void> {
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

  async loginWithtEmail(params: {
    email: string;
    password: string;
  }): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(params.email, params.password)
      .finally(() => {
        if (
          this.afUser$.pipe(take(1)).subscribe((user) => user.emailVerified)
        ) {
          this.router.navigate(['/add-books']);
          this.loadingService.loading = false;
        } else {
          this.loadingService.loading = false;
          return;
        }
      })
      .catch((error) => {
        this.loadingService.loading = false;
        switch (error.code) {
          case 'auth/user-not-found':
            alert('このメールアドレスのユーザーは見つかりません');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています');
            break;
          case 'auth/invalid-email':
            alert(
              '有効なアカウントではありません。、送られたメールから認証を完了してください。'
            );
            break;
        }
      })
      .then(() => {
        return;
      });
  }

  async loginWithGoogle(): Promise<void> {
    this.isProcessing = true;
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .finally(() => {
        this.router.navigateByUrl('/add-books');
        this.isProcessing = false;
      })
      .catch(() => {
        this.loadingService.loading = false;
        this.snackBar.open('ログイン中にエラーが発生しました。');
      });
  }

  async logout(): Promise<void> {
    this.isProcessing = true;
    this.afAuth
      .signOut()
      .finally(() => {
        this.router.navigateByUrl('/welcome');
        this.isProcessing = false;
      })
      .then(() => {
        this.snackBar.open('ログアウトしました');
      });
  }
}
