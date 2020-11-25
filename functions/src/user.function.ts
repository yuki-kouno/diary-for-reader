import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {
  shouldEventRun,
  markEventTried,
  deleteCollectionByReference,
  deleteCollectionByPath,
} from './util';
import { sendEmail } from './send-email.function';
import { User } from './interfaces/user';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db.doc(`users/${user.uid}`).set({
          uid: user.uid,
          email: user.email,
        });
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });

export const sendEmailCreateUseer = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}')
  .onCreate((snap, context) => {
    const user = snap.data();
    const eventId = context.eventId;
    functions.logger.info(user, eventId);
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
  .https.onCall((snap: User, _) => {
    functions.logger.info(`User:${snap.uid}'s Data Are Deleting.`);
    return admin.auth().deleteUser(snap.uid);
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;
    const reviewsRef = db.collectionGroup(`reviews`).where('uid', '==', uid);
    const deleteFireStoreUser = db.doc(`users/${uid}`).delete();

    return Promise.all([
      deleteCollectionByReference(reviewsRef),
      deleteCollectionByPath(`users/${uid}/favoriteBooks`),
      deleteFireStoreUser,
    ]);
  });

export const sendEmailDeleteUseer = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}')
  .onDelete((snap, context) => {
    const user = snap.data();
    const eventId = context.eventId;
    functions.logger.info(user, eventId);
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await sendEmail({
          to: user.email,
          templateId: 'd-627f7a2f8dd741039e8d3690717c835c',
          dynamicTemplateData: {},
        });
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });
