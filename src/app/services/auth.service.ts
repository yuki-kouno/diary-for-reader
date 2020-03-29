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
  providedIn: 'root'
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
    this.afUser$.subscribe(user => {
      this.uid = user && user.uid;
    });
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(afUser$ => {
        return this.userService.createUser(afUser$);
      })
      .catch(err => console.log(err));
  }

  logIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(afUser$ => {
        return this.userService.createUser(afUser$);
      })
      .catch(err => console.log(err));
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        console.log(credential.user);
        return this.userService.createUser(credential.user);
      })
      .catch(err => console.log(err));
  }

  googleLogin() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/review');
      })
      .then(() => {
        this.snackBer.open('ようこそ', null, {
          duration: 2000
        });
      });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/welcome').then(() => {
      this.snackBer.open('ログアウトしました', null, {
        duration: 2000
      });
    });
  }
}
