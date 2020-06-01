import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { DialogChoiceBookComponent } from '../dialog-choice-book/dialog-choice-book.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { questionLists } from './question-lists';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { LibraryComponent } from 'src/app/library/library/library.component';
import { Book } from 'src/app/interface/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  nowDate: Date;
  questionLists: string[] = questionLists;
  book: Observable<Book>;

  questions = [];
  items = [];

  constructor(
    public dialog: MatDialog,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService
  ) {
    this.route.paramMap.subscribe((map) => {
      const bookId = map.get('bookId');
      console.log(bookId);
      this.book = this.databaseBooks.getToFavoriteBook(bookId);
      console.log(this.book);
    });
  }

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
  }
}
