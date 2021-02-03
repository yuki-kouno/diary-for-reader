import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Book[];
  searchText: string;
  subscriptions: Subscription;
  myfavoriteBookIds: string[];
  isMyfavorite: boolean;

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.subscriptions = this.databaseBooks
      .getToFavoriteBookIds()
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
  }

  ngOnInit() {
    this.subscriptions = this.route.paramMap
      .pipe(
        switchMap((param) => {
          this.searchText = param.get('searchText');
          return this.googleBooksApi.getListOfBooks(this.searchText);
        }),
        map((datas) => {
          this.loadingService.loading = false;
          if (datas) {
            return datas.filter((data) => data.volumeInfo.imageLinks);
          }
          return;
        })
      )
      .subscribe((datas: Book[]) => {
        this.bookData = datas;
      });
  }

  createBook(book: Book) {
    this.subscriptions = this.databaseBooks
      .getToFavoriteBookIds()
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
    this.isMyfavorite = this.myfavoriteBookIds.includes(book.id);
    if (this.isMyfavorite) {
      this.snackBar.open(`すでに保存されています`);
    } else {
      this.databaseBooks.createToFavoriteBook(book);
    }
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      'rgb(237, 245, 245)';
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
