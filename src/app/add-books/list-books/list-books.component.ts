import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  bookData: Book[];
  searchText: string;
  myfavoriteBookIds: string[];
  isAddedBook = [];

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.databaseBooks
      .getFavoriteBookIds()
      .pipe(take(1))
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
        }),
        map((datas) => {
          return datas.map((data) => {
            if (data.id) {
              return {
                ...data,
                isFavorite: this.myfavoriteBookIds.includes(data.id),
              };
            }
          });
        })
      )
      .subscribe((datas: Book[]) => {
        this.bookData = datas;
      });
  }

  createBook(book: Book) {
    this.databaseBooks.createFavoriteBook(book);
    this.isAddedBook.push(book.id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
