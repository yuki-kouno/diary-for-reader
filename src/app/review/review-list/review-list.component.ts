import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/interface/review';
import { FormControl } from '@angular/forms';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  @Input() review: Review;
  @Input() book: Book;
  @Input() isDate: boolean;
  editForm = new FormControl();
  isEditable: boolean;

  constructor(private databaseReviewsService: DatabaseReviewsService) {}

  isEditMode() {
    this.isEditable = true;
    this.editForm.setValue(this.review.answer);
  }
  updataReview() {
    this.databaseReviewsService.updateReview(this.book, {
      id: this.review.id,
      answer: this.editForm.value,
    });
  }
  deleteReview() {
    this.databaseReviewsService.deleteReview(this.book, this.review);
  }

  ngOnInit(): void {}
}
