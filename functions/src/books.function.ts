import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { deleteCollectionByReference } from './util';

const db = admin.firestore();

export const deleteReviews = functions
  .region('asia-northeast1')
  .https.onCall(async (id, _) => {
    const reviewsRef = db.collectionGroup(`reviews`).where('bookId', '==', id);
    return deleteCollectionByReference(reviewsRef);
  });
