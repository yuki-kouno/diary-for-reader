import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit, OnDestroy {
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
    private db: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar
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
  }

  createBook(book: Book) {
    this.subscriptions = this.databaseBooks
      .getToFavoriteBookIds()
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
    this.isMyfavorite = this.myfavoriteBookIds.includes(book.id);
    if (this.isMyfavorite) {
      this.snackBar.open(`この本ライブラリにあるよー`, null, {
        duration: 2000,
      });
    } else {
      this.databaseBooks.createToFavoriteBook(book);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
