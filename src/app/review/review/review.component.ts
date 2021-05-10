import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { Book } from 'src/app/interface/book';
import { Observable } from 'rxjs';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { ReviewListComponent } from '../review-list/review-list.component';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { SeoService } from 'src/app/services/seo.service';
import { tap } from 'rxjs/operators';
import { AllReviewListComponent } from '../all-review-list/all-review-list.component';
import { LoadingService } from 'src/app/services/loading.service';
import { Meta } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @ViewChild(ReviewListComponent)
  public reviewListComponent: ReviewListComponent;
  @ViewChild(AllReviewListComponent)
  public allReviewListComponent: AllReviewListComponent;
  @ViewChild(ReviewFormComponent)
  public reviewFormComponet: ReviewFormComponent;
  order = 'desc';
  nowDate: Date;
  bookId: string = this.route.snapshot.paramMap.get('book.id');
  book$: Observable<Book> = this.databaseBooks.getFavoriteBook(this.bookId);
  reviews$: Observable<Review[]> = this.databaseReviews
    .getReviews(this.bookId)
    .pipe(tap(() => (this.loaingService.loading = false)));
  allReviews$: Observable<Review[]> = this.databaseReviews.getAllReviews(
    this.bookId,
    this.order
  );
  selected = new FormControl(0);
  reviewListCount = 0;
  allReviewCount = 0;

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReviews: DatabaseReviewsService,
    private seoService: SeoService,
    public loaingService: LoadingService,
    private meta: Meta
  ) {
    this.loaingService.loading = true;
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
    this.book$.subscribe((book) => {
      this.seoService.setTitleAndMeta(
        `【 ${book.volumeInfo.title} 】 レビューページ`
      );
    });
  }

  onReviewListCount(event) {
    this.reviewListCount = this.reviewListCount + event;
  }

  onAllReviewCount(event) {
    this.allReviewCount = this.allReviewCount + event;
  }

  back() {
    history.back();
  }

  orderAllReview(order) {
    this.loaingService.loading = true;
    this.order = order;
    this.allReviews$ = this.databaseReviews
      .getAllReviews(this.bookId, order)
      .pipe(tap(() => (this.loaingService.loading = false)));
  }

  ngOnInit(): void {}
}
