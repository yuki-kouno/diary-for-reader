import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { GetBookComponent } from './get-book/get-book.component';


const routes: Routes = [
  {
    path: '',
    component: SearchBooksComponent
  },
  { path: 'list-books/:searchText', component: ListBooksComponent },
  { path: 'get-book/:id', component: GetBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBooksRoutingModule { }
