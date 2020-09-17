import { Component, OnInit } from '@angular/core';
import { RankingBook } from 'src/app/interface/ranking-book';
import { Observable } from 'rxjs';
import { DatabaseRankingBooksService } from 'src/app/services/database-ranking-books.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-books-ranking',
  templateUrl: './books-ranking.component.html',
  styleUrls: ['./books-ranking.component.scss'],
})
export class BooksRankingComponent implements OnInit {
  public bookRanking$: Observable<
    [
      {
        title: string;
        img: string;
        author: string;
      }
    ]
  > = this.rankingBookService.getRankingBooks().pipe(
    map((data) => {
      return data.rankingBooksInfo;
    })
  );

  constructor(private rankingBookService: DatabaseRankingBooksService) {}

  ngOnInit(): void {}
}
