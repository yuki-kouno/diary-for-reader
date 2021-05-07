import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { RankingBooksInfo } from 'src/app/interface/ranking-books-info';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-books-ranking',
  templateUrl: './books-ranking.component.html',
  styleUrls: ['./books-ranking.component.scss'],
})
export class BooksRankingComponent implements OnInit {
  title = '売れ筋ランキング';
  booksRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService
    .getBooksRanking()
    .pipe(tap(() => (this.loadingService.loading = false)));
  businessesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getBusinessesRanking();
  humanitiesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getHumanitiesRanking();
  literaturesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getliteraturesRanking();
  comicsRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getComicsRanking();
  hobbiesRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getHobbiesRanking();

  constructor(
    private rankingBookService: DatabaseRankingBooksService,
    private seoService: SeoService,
    private meta: Meta,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
    this.seoService.setTitleAndMeta(this.title);
  }

  ngOnInit(): void {}
}
