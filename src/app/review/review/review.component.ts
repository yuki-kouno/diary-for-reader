import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  nowDate: Date;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.nowDate = new Date();
  }

}
