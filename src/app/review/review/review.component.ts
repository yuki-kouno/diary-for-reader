import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { take, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Book } from 'src/app/interface/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  nowDate: Date;

  book$: Observable<Book> = this.route.paramMap.pipe(
    switchMap((map) => {
      const bookId = map.get('book.id');
      // console.log(bookId);
      return this.databaseBooks.getToFavoriteBook(bookId);
    })
  );
  // .pipe(tap((book) => console.log(book)));

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService
  ) {}

  ngOnInit(): void {
    this.nowDate = new Date();
  }
}
