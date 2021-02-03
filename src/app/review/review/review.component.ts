import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, AfterViewInit {
  @ViewChild(ReviewListComponent)
  public reviewListComponent: ReviewListComponent;
  @ViewChild(AllReviewListComponent)
  public allReviewListComponent: AllReviewListComponent;
  @ViewChild(ReviewFormComponent)
  public reviewFormComponet: ReviewFormComponent;
  nowDate: Date;
  bookId: string = this.route.snapshot.paramMap.get('book.id');
  book$: Observable<Book> = this.databaseBooks.getToFavoriteBook(this.bookId);
  reviews$: Observable<Review[]> = this.databaseReviews.getReviews(this.bookId);
  allReviews$: Observable<Review[]> = this.databaseReviews.getAllReviews(
    this.bookId
  );
  reviewListCount = 0;
  allReviewCount = 0;

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReviews: DatabaseReviewsService,
    private elementRef: ElementRef,
    private seoService: SeoService
  ) {
    this.book$.pipe(
      tap((book) => {
        this.seoService.setTitleAndMeta(
          `${book.volumeInfo.title}`,
          'レヴューページ'
        );
      })
    );
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

  ngOnInit(): void {
    this.nowDate = new Date();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      'rgb(224, 239, 243, 0.6)';
  }
}
