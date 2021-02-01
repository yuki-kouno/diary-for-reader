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

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Book[];
  searchText: string;
  routePramMap = this.route.paramMap;
  subscriptions: Subscription;
  myfavoriteBookIds: string[];
  isMyfavorite: boolean;

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef
  ) {
    this.subscriptions = this.databaseBooks
      .getToFavoriteBookIds()
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
  }

  ngOnInit() {
    this.subscriptions = this.routePramMap
      .pipe(
        switchMap((param) => {
          this.searchText = param.get('searchText');
          return this.googleBooksApi.getListOfBooks(this.searchText);
        }),
        map((datas) => {
          return datas.filter((data) => data.volumeInfo.imageLinks);
        })
      )
      .subscribe((datas: Book[]) => {
        this.bookData = datas;
      });
    console.log(this.searchText);
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
