import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { questionsList } from './questions-list';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Book } from 'src/app/interface/book';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() book: Book;

  reviews$: Observable<Review[]> = this.databaseReviewService.getReviews();

  selectedQuestion = [];
  questionsList = questionsList;
  nowDate: Date;

  public showSimpleInput = false;

  form = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private snackBer: MatSnackBar,
    public databaseReviewService: DatabaseReviewsService
  ) {
    databaseReviewService.getReviews().pipe(tap((ref) => console.log(ref)));
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  addQuestion(question: string) {
    if (!this.selectedQuestion.includes(question)) {
      this.answers.push(
        this.fb.group({
          answer: ['', Validators.required],
        })
      );
      this.selectedQuestion.push(question);
    } else if (question === null) {
      this.answers.push(
        this.fb.group({
          answer: ['', Validators.required],
        })
      );
      this.selectedQuestion.push(question);
    } else {
      this.snackBer.open('その質問は既にあります', null, {
        duration: 2000,
      });
    }
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
  }

  getReview() {}

  getReviews(book: Book) {
    this.databaseReviewService
      .getReviews()
      .pipe(tap((reviews) => console.log(reviews)));
  }

  createReview(book: Book, index) {
    // console.log(book.id);
    const review: Review = {
      createdDate: new Date(),
      createdAt: new Date(),
      title: book.volumeInfo.title,
      question: this.selectedQuestion[index],
      answer: this.answers.value[index].answer,
    };

    this.databaseReviewService.createReview(book, review);
  }

  updateReview() {}

  deleteReview() {}

  ngOnInit() {}
}
