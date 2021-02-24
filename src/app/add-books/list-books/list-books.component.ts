import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map, take, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { DatabaseNewReleaseService } from 'src/app/services/database-new-release.service';
import { NewReleaseInfo } from 'src/app/interface/new-release-info';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  searchText: string;
  bookData$: Observable<Book[]> = this.route.paramMap.pipe(
    switchMap((param) => {
      this.searchText = param.get('searchText');
      return this.googleBooksApi.getListOfBooks(this.searchText);
    })
  );
  bookData: Book[];
  myfavoriteBookIds: string[];
  isAddedBook = [];
  releaseDatas: Observable<NewReleaseInfo[]>[] = [
    this.dbNewReleaseService.getBusinessDatas(),
    this.dbNewReleaseService.getComicDatas(),
    this.dbNewReleaseService.getItDatas(),
    this.dbNewReleaseService.getLifeDatas(),
    this.dbNewReleaseService.getLiteratureDatas(),
  ];

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    public loadingService: LoadingService,
    private dbNewReleaseService: DatabaseNewReleaseService
  ) {
    this.loadingService.loading = true;
    this.databaseBooks
      .getFavoriteBookIds()
      .pipe(take(1))
      .subscribe((bookIds) => (this.myfavoriteBookIds = bookIds));
  }

  ngOnInit() {
    this.subscriptions = this.bookData$
      .pipe(
        map((datas) => {
          if (datas?.length) {
            return datas.map((data) => {
              if (data.id) {
                return {
                  ...data,
                  isFavorite: this.myfavoriteBookIds?.includes(data.id),
                };
              } else {
                return;
              }
            });
          }
        })
      )
      .subscribe((datas: Book[]) => {
        this.loadingService.loading = false;
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
