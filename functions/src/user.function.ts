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
const guestId = functions.config().guest.user_id;

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      avatarURL: user.photoURL,
      createdAt: new Date(),
      firstTour: true,
      secondTour: true,
      thirdTour: true,
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

export const resetGuestData = functions
  .region('asia-northeast1')
  .https.onRequest(async (req: any, res: any) => {
    deleteGuestData();

    return res.status(200).send('success');
  });

export const resetGuestDataByClient = functions
  .region('asia-northeast1')
  .https.onCall(async (req: any, res: any) => {
    deleteGuestData();

    return true;
  });

function deleteGuestData() {
  const reviewsRef = db.collectionGroup(`reviews`).where('uid', '==', guestId);

  Promise.all([
    deleteCollectionByReference(reviewsRef),
    deleteCollectionByPath(`users/${guestId}/favoriteBooks`),
    db.doc(`users/${guestId}`).update({
      firstTour: true,
      secondTour: true,
      thirdTour: true,
    }),
  ]).catch((err) => console.log(err));
}
