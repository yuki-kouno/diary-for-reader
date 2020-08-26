import { getBookInfo } from './bookRanking-scraping.function';
import { firestore } from 'firebase-admin';

const sendBookRankingData = getBookInfo((data) => {
  return firestore.collection('rankingData').set(data);
});

exports.scheduledFunction = sendBookRankingData()
  .pubsub.schedule('every 1 days')
  .onRun((context) => {
    return;
  });
