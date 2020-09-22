import { Component, OnInit, Input } from '@angular/core';
import { RankingBookInfo } from 'src/app/interface/ranking-book-info';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() book: RankingBookInfo;
  @Input() rankingIndex: number;

  constructor() {}

  ngOnInit(): void {}
}
