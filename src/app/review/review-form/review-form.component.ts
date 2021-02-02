import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { questionsList } from './questions-list';
import { Book } from 'src/app/interface/book';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  @Input() book: Book;
  showInput: boolean;
  selectedQuestion: string[] = [];
  questionsList: string[] = questionsList;
  nowDate: Date;
  editableCount = 0;

  form: FormGroup = this.fb.group({
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
    if (!this.editableCount) {
      return;
    } else if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
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
      return this.snackBer.open('その質問は既にあります');
    }
    this.showInput = true;
    this.editableCount += 1;
    this.cd.detectChanges();
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.selectedQuestion.splice(index, 1);
    this.editableCount -= 1;
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
    this.editableCount -= 1;
  }

  ngOnInit() {}
}
