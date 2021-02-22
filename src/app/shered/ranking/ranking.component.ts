import { Component, OnInit, Input } from '@angular/core';
import { RankingBooksInfo } from 'src/app/interface/ranking-books-info';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() book: RankingBooksInfo;
  @Input() rankingIndex: number;

  constructor() {}

  ngOnInit(): void {}
}
