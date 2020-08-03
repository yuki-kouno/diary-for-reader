import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { LibrarySearchComponent } from './library-search/library-search.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
  },
  { path: 'library-search', component: LibrarySearchComponent },
  { path: 'library-search/:searchText', component: LibrarySearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
