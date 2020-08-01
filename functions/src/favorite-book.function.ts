import { Algolia } from './algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createBook = functions
  .region('asia-northeast1')
  .firestore.document(`users/{userId}/favoriteBooks/{favoriteBookId}`)
  .onCreate((snap) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'favoriteBooks',
      largeConcentKey: 'body',
      data,
    });
  });

export const deleteBook = functions
  .region('asia-northeast1')
  .firestore.document(`users/{userId}/favoriteBooks/{favoriteBookId}`)
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('favoriteBooks', data.id);
    } else {
      return;
    }
  });

export const updateBook = functions
  .region('asia-northeast1')
  .firestore.document(`users/{userId}/favoriteBooks/{favoriteBookId}`)
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'favoriteBooks',
      largeConcentKey: 'body',
      isUpdate: true,
      data,
    });
  });
