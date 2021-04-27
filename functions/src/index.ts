import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './favorite-book.function';
export * from './book-ranking-scraping.function';
export * from './user.function';
export * from './books.function';
export { backup } from './backup.function';
