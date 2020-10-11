import { Component, OnInit } from '@angular/core';
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
  nowDate: Date;
  bookId = this.route.snapshot.paramMap.get('book.id');
  book$: Observable<Book> = this.databaseBooks.getToFavoriteBook(this.bookId);
  reviews$: Observable<Review[]> = this.databaseReviews.getReviews(this.bookId);
  allReviews$: Observable<Review[]> = this.databaseReviews.getAllReviews(
    this.bookId
  );

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReviews: DatabaseReviewsService
  ) {}

  ngOnInit(): void {
    this.nowDate = new Date();
  }
}
