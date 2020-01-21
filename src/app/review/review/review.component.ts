import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  nowDate: Date;

  constructor(
    private datePipe: DatePipe,
    private nav: NavService
    ) {}

  ngOnInit(): void {
    this.nowDate = new Date();
    this.nav.show();
  }

}
