import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRankingRoutingModule } from './books-ranking-routing.module';
import { BooksRankingComponent } from './books-ranking/books-ranking.component';

@NgModule({
  declarations: [BooksRankingComponent],
  imports: [CommonModule, BooksRankingRoutingModule],
})
export class BooksRankingModule {}
