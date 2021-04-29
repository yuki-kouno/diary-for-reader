import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../shered/settings-bottom-sheet/settings-bottom-sheet.component';
import { rubberBandAnimation } from 'angular-animations';
import { DatabaseBooksService } from '../services/database-books.service';
import { Observable } from 'rxjs';
import { Book } from '../interface/book';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [rubberBandAnimation()],
})
export class SideNavComponent implements OnInit {
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
    public loadingService: LoadingService
  ) {}

  openSheet() {
    this.bottomSheet.open(SettingsBottomSheetComponent, {
      panelClass: 'custom-side-nav',
    });
  }

  ngOnInit(): void {}

  animDone() {
    setTimeout(() => {
      this.animState = !this.animState;
    }, 500);
  }
}
