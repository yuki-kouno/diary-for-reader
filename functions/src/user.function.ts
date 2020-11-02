import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// import { User } from './interfaces/user';

export const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      email: user.email,
    });
  });
