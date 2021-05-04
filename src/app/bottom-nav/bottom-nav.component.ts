import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../shered/settings-bottom-sheet/settings-bottom-sheet.component';
import { rubberBandAnimation } from 'angular-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseBooksService } from '../services/database-books.service';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../interface/book';
import { UserService } from '../services/user.service';
import { DatabaseReviewsService } from '../services/database-reviews.service';
import { User } from '@interfaces/user';
import { Review } from '../interface/review';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  animations: [rubberBandAnimation({ delay: 500 })],
})
export class BottomNavComponent implements OnInit {
  user$: Observable<User> = this.userService.user$;
  isReview$: Observable<Review[]> = this.reviewService.checkReviewExists();
  isBook$: Observable<Book[]> = this.databaseBooks.checkFavoriteBookExists();
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
    private userService: UserService,
    private reviewService: DatabaseReviewsService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  openBottomSheet(): void {
    this.bottomSheet.open(SettingsBottomSheetComponent, {
      panelClass: 'custom-bottom-nav',
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
