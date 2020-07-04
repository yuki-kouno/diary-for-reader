import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { DialogChoiceBookComponent } from '../dialog-choice-book/dialog-choice-book.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Book } from 'src/app/interface/book';
import { Observable } from 'rxjs';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  review: Review = {
    reviewId: 'ai@jrg ',
    title: 'マリオ',
    question: '作者の主張のどこに賛成できるか、その理由は ?',
    text: 'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ'
  };

  nowDate: Date;

  book$: Observable<Book> = this.route.paramMap
    .pipe(
      switchMap((map) => {
        const bookId = map.get('book.id');
        console.log(bookId);
        return this.databaseBooks.getToFavoriteBook(bookId);
      })
    )
    .pipe(tap((book) => console.log(book)));

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReview: DatabaseReviewsService,
  ) {}

  ngOnInit(): void {
    this.nowDate = new Date();
  }
}
