import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavService } from 'src/app/services/nav.service';
import { DialogChoiceBookComponent } from '../dialog-choice-book/dialog-choice-book.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { questionLists } from './question-lists';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  nowDate: Date;
  questionLists = questionLists;
  questions = [];
  items = [];

  constructor(
    private datePipe: DatePipe,
    private nav: NavService,
    public dialog: MatDialog,
    private ngZone: NgZone
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

  ngOnInit(): void {
    this.nowDate = new Date();
    this.nav.show();
  }
}
