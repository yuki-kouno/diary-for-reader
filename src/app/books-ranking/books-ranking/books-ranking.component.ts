import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { RankingBookInfo } from 'src/app/interface/ranking-book-info';

@Component({
  selector: 'app-books-ranking',
  templateUrl: './books-ranking.component.html',
  styleUrls: ['./books-ranking.component.scss'],
})
export class BooksRankingComponent implements OnInit {
  booksRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getBooksRanking();
  businessesRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getBusinessesRanking();
  humanitiesRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getHumanitiesRanking();
  literaturesRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getliteraturesRanking();
  comicsRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getComicsRanking();
  hobbiesRanking$: Observable<
    RankingBookInfo[]
  > = this.rankingBookService.getHobbiesRanking();

  constructor(private rankingBookService: DatabaseRankingBooksService) {}

  ngOnInit(): void {}
}
