import { Injectable } from '@angular/core';
import Vibrant from 'node-vibrant';

@Injectable({
  providedIn: 'root',
})
export class VibrantService {
  constructor() {}

  vibrant(imgPath) {
    Vibrant.from(imgPath)
      .getPalette()
      .then((palette) => console.log(palette));
  }
}
