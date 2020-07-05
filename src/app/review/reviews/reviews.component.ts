import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { DialogChoiceBookComponent } from '../dialog-choice-book/dialog-choice-book.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take, switchMap, tap } from 'rxjs/operators';
import { questionsList } from './questions-list';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Book } from 'src/app/interface/book';
import { Observable } from 'rxjs';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { text } from 'body-parser';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  review: Review = {
    reviewId: 'ai@jrg ',
    title: 'マリオ',
    question: '作者の主張のどこに賛成できるか、その理由は ?',
    text:
      'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
  };

  // @Input() review: Review;
  @Input() book: Book;

  nowDate: Date;
  questionsList: string[] = questionsList;
  questions = [];
  items = [];

  reviewForm = this.fb.group({
    review: ['', [Validators.required]],
  });

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReview: DatabaseReviewsService,
    private fb: FormBuilder
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openDialogChoiceBook() {
    this.dialog.open(DialogChoiceBookComponent, {
      width: '100%',
      height: '100%',
    });
  }

  addQuestion(item) {
    const message = item;
    if (message) {
      this.questions.push({ message });
    } else {
      this.questions.push('');
    }
  }

  cancelReview() {
    const reviewItem = document.querySelector('li');
    if (reviewItem) {
      reviewItem.remove();
    }
  }

  get reviewControl() {
    return this.reviewForm.get('review') as FormControl;
  }

  submit() {
    console.log(this.reviewForm.value);
  }

  getReview() {}

  getReviews() {}

  createReview(book) {
    console.log(book.id);
    this.databaseReview.createReview(book, this.reviewForm.value);
  }

  updateReview() {}

  deleteReview() {}

  ngOnInit() {}
}
