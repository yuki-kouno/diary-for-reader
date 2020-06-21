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

@NgModule({
  declarations: [SearchBooksComponent, ListBooksComponent],
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
  ],
  entryComponents: [SearchBooksComponent, ListBooksComponent],
})
export class AddBooksModule {}
