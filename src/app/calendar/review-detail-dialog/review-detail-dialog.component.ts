import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/interface/review';

@Component({
  selector: 'app-review-detail-dialog',
  templateUrl: './review-detail-dialog.component.html',
  styleUrls: ['./review-detail-dialog.component.scss'],
})
export class ReviewDetailDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Review) {}

  ngOnInit(): void {}
}
