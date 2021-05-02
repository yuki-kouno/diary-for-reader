import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../shered/settings-bottom-sheet/settings-bottom-sheet.component';
import { rubberBandAnimation } from 'angular-animations';
import { ActivatedRoute } from '@angular/router';
import { DatabaseBooksService } from '../services/database-books.service';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../interface/book';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  animations: [rubberBandAnimation({ delay: 500 })],
})
export class BottomNavComponent implements OnInit {
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

  openBottomSheet(): void {
    this.bottomSheet.open(SettingsBottomSheetComponent, {
      panelClass: 'custom-bottom-nav',
    });
  }

  ngOnInit(): void {}

  animDone() {
    this.animState = !this.animState;
  }
}
