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
  public booksRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getBooksRanking();
  public businessRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getBusinessRanking();
  public humanitieRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getHumanitiesRanking();
  public literatureRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getliteratureRanking();
  public comicRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getComicsRanking();
  public hobbyRanking$: Observable<
    [RankingBookInfo]
  > = this.rankingBookService.getHobbyRanking();

  constructor(private rankingBookService: DatabaseRankingBooksService) {}

  ngOnInit(): void {}
}
