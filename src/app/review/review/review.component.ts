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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, AfterViewInit {
  @ViewChild(ReviewListComponent)
  public reviewListComponent: ReviewListComponent;
  @ViewChild(ReviewFormComponent)
  public reviewFormComponet: ReviewFormComponent;
  nowDate: Date;
  bookId = this.route.snapshot.paramMap.get('book.id');
  book$: Observable<Book> = this.databaseBooks.getToFavoriteBook(this.bookId);
  reviews$: Observable<Review[]> = this.databaseReviews.getReviews(this.bookId);
  allReviews$: Observable<Review[]> = this.databaseReviews.getAllReviews(
    this.bookId
  );
  checkedGuard = false;

  constructor(
    private route: ActivatedRoute,
    private databaseBooks: DatabaseBooksService,
    private databaseReviews: DatabaseReviewsService,
    private elementRef: ElementRef
  ) {}

  back() {
    history.back();
  }

  guardState(eventDate: boolean) {
    this.checkedGuard = eventDate;
  }

  ngOnInit(): void {
    this.nowDate = new Date();
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      'rgb(224, 239, 243, 0.6)';
  }
}
