import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { questionsList } from './questions-list';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interface/book';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseBooksService } from 'src/app/services/database-books.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  showInput = false;
  @Input() book: Book;

  selectedQuestion = [];
  questionsList = questionsList;
  nowDate: Date;

  form = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private snackBer: MatSnackBar,
    private databaseBooks: DatabaseBooksService,
    public databaseReviewService: DatabaseReviewsService
  ) {}

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
          answer: [''],
        })
      );
      this.selectedQuestion.push(question);
    } else if (question === null) {
      this.answers.push(
        this.fb.group({
          answer: [''],
        })
      );
      this.selectedQuestion.push(question);
    } else {
      this.snackBer.open('その質問は既にあります', null, {
        duration: 2000,
      });
    }
    this.showInput = true;
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
  }

  createReview(book: Book, index: number) {
    const review: Omit<Review, 'id' | 'createdDate' | 'createdAt'> = {
      title: book.volumeInfo.title,
      question: this.selectedQuestion[index],
      answer: this.answers.value[index].answer,
    };
    this.databaseReviewService.createReview(book, review);
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
  }

  ngOnInit() {}
}
