import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interface/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private snackBer: MatSnackBar,
    private db: AngularFirestore,

  ) { }
  // createUser(user: User) {
  //   const docUser: AngularFirestoreDocument<User> = this.db.doc(
  //     `users/${user.uid}`
  //   );
  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName || '',
  //     photoURL: user.photoURL || '',
  //     profile: user.profile || ''
  //   };
  //   return docUser.set(data);
  // }
}
