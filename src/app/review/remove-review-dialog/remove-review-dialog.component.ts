import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';

@Component({
  selector: 'app-remove-review-dialog',
  templateUrl: './remove-review-dialog.component.html',
  styleUrls: ['./remove-review-dialog.component.scss'],
})
export class RemoveReviewDialogComponent implements OnInit {
  constructor(
    private databaseReviewsService: DatabaseReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  deleteReview(book, review) {
    this.databaseReviewsService.deleteReview(book, review);
  }

  ngOnInit(): void {}
}
