import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRankingRoutingModule } from './books-ranking-routing.module';
import { BooksRankingComponent } from './books-ranking/books-ranking.component';

import { MatTabsModule } from '@angular/material/tabs';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [BooksRankingComponent, RankingComponent],
  imports: [CommonModule, BooksRankingRoutingModule, MatTabsModule],
})
export class BooksRankingModule {}
