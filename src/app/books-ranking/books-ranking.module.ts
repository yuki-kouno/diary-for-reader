import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRankingRoutingModule } from './books-ranking-routing.module';
import { BooksRankingComponent } from './books-ranking/books-ranking.component';

import { MatTabsModule } from '@angular/material/tabs';
import { SheredModule } from '../shered/shered.module';

@NgModule({
  declarations: [BooksRankingComponent],
  imports: [
    CommonModule,
    BooksRankingRoutingModule,
    MatTabsModule,
    SheredModule,
  ],
})
export class BooksRankingModule {}
