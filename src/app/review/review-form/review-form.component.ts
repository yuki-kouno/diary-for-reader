import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { questionsList } from './questions-list';
import { Book } from 'src/app/interface/book';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  showInput = false;
  @Input() book: Book;

  selectedQuestion = [];
  questionsList = questionsList;
  nowDate: Date;

  form = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBer: MatSnackBar,
    public databaseReviewService: DatabaseReviewsService
  ) {}

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
      this.snackBer.open('その質問は既にあります');
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
    this.databaseReviewService.createReview(book, review).then(() => {
      this.snackBer.open('保存しました。');
    });
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
  }

  ngOnInit() {}
}
