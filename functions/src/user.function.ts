import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './util';
import { sendEmail } from './send-email.function';

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
