import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksApiService } from 'src/app/services/google-books-api.service';
import { Book } from 'src/app/interface/book';
import { DatabaseBooksService } from 'src/app/services/database-books.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { DatabaseNewReleaseService } from 'src/app/services/database-new-release.service';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { NewReleaseInfo } from 'src/app/interface/new-release-info';

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
  releaseDatas: Observable<NewReleaseInfo[]>[] = [
    this.dbNewReleaseService.getBusinessDatas(),
    this.dbNewReleaseService.getComicDatas(),
    this.dbNewReleaseService.getItDatas(),
    this.dbNewReleaseService.getLifeDatas(),
    this.dbNewReleaseService.getLiteratureDatas(),
  ];
  rank$ = this.dbranking.getNweReleaseRanking();

  constructor(
    public googleBooksApi: GoogleBooksApiService,
    public route: ActivatedRoute,
    public databaseBooks: DatabaseBooksService,
    public loadingService: LoadingService,
    private dbNewReleaseService: DatabaseNewReleaseService,
    private dbranking: DatabaseRankingBooksService
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
