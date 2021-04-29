import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {
  shouldEventRun,
  markEventTried,
  deleteCollectionByReference,
  deleteCollectionByPath,
} from './util';
import { sendEmail } from './send-email.function';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      email: user.email,
      firstTour: true,
      secondTour: true,
    });
  });

export const sendEmailCreateUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}')
  .onCreate((snap, context) => {
    const user = snap.data();
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await sendEmail({
          to: user.email,
          templateId: 'd-ec6aa6a8b93f445a8275ab194eeae117',
          dynamicTemplateData: {},
        });
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });

export const deleteAfUser = functions
  .region('asia-northeast1')
  .https.onCall((data, _) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, context) => {
    const uid = user.uid;
    const eventId = context.eventId;
    const email: any = user.email;
    const reviewsRef = db.collectionGroup(`reviews`).where('uid', '==', uid);
    const deleteFireStoreUser = db.doc(`users/${uid}`).delete();

    Promise.all([
      deleteCollectionByReference(reviewsRef),
      deleteCollectionByPath(`users/${uid}/favoriteBooks`),
      deleteFireStoreUser,
    ]).catch((err) => console.log(err));

    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await sendEmail({
          to: email,
          templateId: 'd-627f7a2f8dd741039e8d3690717c835c',
          dynamicTemplateData: {},
        });

        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });
