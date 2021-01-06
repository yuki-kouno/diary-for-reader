import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Input() book: Book;
  @Input() checkedGuard: boolean;
  @Output() event = new EventEmitter();
  showInput: boolean;
  selectedQuestion = [];
  questionsList = questionsList;
  nowDate: Date;
  isComplete: boolean;

  form = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBer: MatSnackBar,
    public databaseReviewService: DatabaseReviewsService,
    private cd: ChangeDetectorRef
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isComplete === true) {
      return;
    } else if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  onGuard() {
    this.checkedGuard = true;
    this.event.emit(this.checkedGuard);
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
    this.isComplete = false;
    this.cd.detectChanges();
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
    this.isComplete = true;
  }

  createReview(book: Book, index: number) {
    const review: Omit<
      Review,
      'id' | 'createdDate' | 'createdAt' | 'uid' | 'bookId' | 'thumbnail'
    > = {
      title: book.volumeInfo.title,
      question: this.selectedQuestion[index],
      answer: this.answers.value[index].answer,
    };
    this.databaseReviewService.createReview(book, review).then(() => {
      this.snackBer.open('保存しました。');
    });
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
    this.isComplete = true;
  }

  ngOnInit() {}
}
