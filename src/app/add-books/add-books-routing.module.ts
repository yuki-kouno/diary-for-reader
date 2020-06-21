import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ListBooksComponent } from './list-books/list-books.component';

const routes: Routes = [
  {
    path: '',
    component: SearchBooksComponent,
  },
  { path: ':searchText', component: SearchBooksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBooksRoutingModule {}
