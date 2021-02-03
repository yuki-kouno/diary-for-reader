import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { RankingBooksInfo } from 'src/app/interface/ranking-books-info';
import { SeoService } from 'src/app/services/seo.service';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-books-ranking',
  templateUrl: './books-ranking.component.html',
  styleUrls: ['./books-ranking.component.scss'],
})
export class BooksRankingComponent implements OnInit {
  booksRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getBooksRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  businessesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getBusinessesRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  humanitiesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getHumanitiesRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  literaturesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getliteraturesRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  comicsRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getComicsRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  hobbiesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getHobbiesRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));

  constructor(
    private rankingBookService: DatabaseRankingBooksService,
    private seoService: SeoService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.seoService.setTitleAndMeta('ブックランキング');
  }

  ngOnInit(): void {}
}
