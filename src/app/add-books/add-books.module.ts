import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBooksRoutingModule } from './add-books-routing.module';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SheredModule } from '../shered/shered.module';
import { MatDividerModule } from '@angular/material/divider';
import { BusinessComponent } from './business/business.component';
import { SwiperModule } from 'swiper/angular';
import { ComicComponent } from './comic/comic.component';
import { ItComponent } from './it/it.component';
import { LifeComponent } from './life/life.component';
import { LiteratureComponent } from './literature/literature.component';
import { BookComponent } from './book/book.component';
import { LightNovelComponent } from './light-novel/light-novel.component';

@NgModule({
  declarations: [
    SearchBooksComponent,
    ListBooksComponent,
    BusinessComponent,
    ComicComponent,
    ItComponent,
    LifeComponent,
    LiteratureComponent,
    BookComponent,
    LightNovelComponent,
  ],
  imports: [
    CommonModule,
    AddBooksRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    SheredModule,
    MatDividerModule,
    SwiperModule,
  ],
  entryComponents: [
    SearchBooksComponent,
    ListBooksComponent,
    BusinessComponent,
  ],
})
export class AddBooksModule {}
