import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../shered/settings-bottom-sheet/settings-bottom-sheet.component';
import { rubberBandAnimation } from 'angular-animations';
import { DatabaseBooksService } from '../services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from '../interface/book';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { DatabaseReviewsService } from '../services/database-reviews.service';
import { Review } from '../interface/review';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [rubberBandAnimation({ delay: 500 })],
})
export class SideNavComponent implements OnInit {
  user$: Observable<User> = this.userService.user$;
  isBook$: Observable<Book[]> = this.databaseBooks.checkFavoriteBookExists();
  isReview$: Observable<Review[]> = this.reviewService.checkReviewExists();
  isTour$: Observable<boolean> = this.route.queryParamMap.pipe(
    map((param) => {
      const value = param.get('tour');
      return value ? value.toLocaleLowerCase() === 'true' : false;
    })
  );
  animState: boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private databaseBooks: DatabaseBooksService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private reviewService: DatabaseReviewsService,
    public loadingService: LoadingService
  ) {}

  openSheet() {
    this.bottomSheet.open(SettingsBottomSheetComponent, {
      panelClass: 'custom-side-nav',
    });
  }

  linkCalender(tour?: boolean, reviewLength?: number) {
    if (tour && reviewLength) {
      const value = { thirdTour: false };
      this.userService.updateUserTour(value);
    }
    this.router.navigate(['/calendar']);
  }

  animDone() {
    this.animState = !this.animState;
  }

  ngOnInit(): void {}
}
