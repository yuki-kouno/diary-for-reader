import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor() {}

  generatePassword() {
    const LENGTH = 6;
    const SOURCE = [
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789',
    ];
    const OFFSET = SOURCE.length - 1;
    const randomConfig = [];
    let sum = 0;
    let result = '';

    for (let i = 0; i <= OFFSET; i++) {
      const includeNum =
        i === OFFSET
          ? LENGTH - sum
          : 1 + Math.floor(Math.random() * (LENGTH - OFFSET - sum - i + 2));

      randomConfig.push({
        src: SOURCE[i],
        includeNum,
        count: 0,
      });
      sum += includeNum;
    }
    for (let i = 0; i < LENGTH; i++) {
      const index = 1 + Math.floor(Math.random() * randomConfig.length - 1);
      const randomSource = randomConfig[index];

      result +=
        randomSource.src[Math.floor(Math.random() * randomSource.src.length)];

      randomSource.count++;

      if (randomSource.count === randomSource.includeNum) {
        randomConfig.splice(index, 1);
      }
    }

    return result;
  }
}
