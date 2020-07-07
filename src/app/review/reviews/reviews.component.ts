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
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  review: Review = {
    reviewId: 'ai@jrg ',
    title: 'マリオ',
    question: '作者の主張のどこに賛成できるか、その理由は ?',
    text:
      'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
  };

  @Input() book: Book;

  nowDate: Date;
  questionsList: string[] = questionsList;
  questions = [];
  items = [];

  public showSimpleInput = false;

  form = this.fb.group({
    reviews: this.fb.array([]),
  });

  get reviews(): FormArray {
    return this.form.get('reviews') as FormArray;
  }

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReview: DatabaseReviewsService,
    private fb: FormBuilder
  ) {}

  addReview(review?: Review) {
    const formGroup = this.fb.group({
      text: ['', [Validators.required]],
    });

    this.reviews.push(formGroup);
  }

  removeReview(index: number) {
    this.reviews.removeAt(index);
  }

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

  submit() {
    console.log(this.form.value);
  }

  getReview() {}

  getReviews() {}

  createReview(book) {
    console.log(book.id);
    this.databaseReview.createReview(book, this.form.value);
  }

  updateReview() {}

  deleteReview() {}

  ngOnInit() {}
}
