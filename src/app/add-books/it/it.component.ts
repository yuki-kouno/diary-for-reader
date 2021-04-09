import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Scrollbar, A11y } from 'swiper/core';
SwiperCore.use([Navigation, Scrollbar, A11y]);
import { DatabaseNewReleaseService } from 'src/app/services/database-new-release.service';

@Component({
  selector: 'app-it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.scss'],
})
export class ItComponent implements OnInit {
  releaseDatas = this.dbNewReleaseService.getItDatas();

  config = {
    slidesPerView: 2.5,
    spaceBetween: 8,
    speed: 300,
    navigation: {
      nextEl: '.navigation__it--next',
      prevEl: '.navigation__it--prev',
    },
    breakpoints: {
      446: {
        slidesPerView: 3.5,
      },
      586: {
        slidesPerView: 4.5,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      920: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1060: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1340: {
        slidesPerView: 7,
        spaceBetween: 20,
      },
    },
    loop: true,
  };

  constructor(private dbNewReleaseService: DatabaseNewReleaseService) {}

  ngOnInit(): void {}
}
