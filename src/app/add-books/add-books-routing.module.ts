import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ListBooksComponent } from './list-books/list-books.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchBooksComponent,
  },
  { path: 'list-books/:searchText', component: ListBooksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBooksRoutingModule {}
