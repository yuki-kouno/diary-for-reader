import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { RankingBooksInfo } from 'src/app/interface/ranking-books-info';

@Component({
  selector: 'app-books-ranking',
  templateUrl: './books-ranking.component.html',
  styleUrls: ['./books-ranking.component.scss'],
})
export class BooksRankingComponent implements OnInit {
  booksRanking$: Observable<
    RankingBooksInfo[]
  > = this.rankingBookService.getBooksRanking();
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

  constructor(private rankingBookService: DatabaseRankingBooksService) {}

  ngOnInit(): void {}
}
