import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../library/library.module').then((mod) => mod.LibraryModule),
      },
      {
        path: 'review',
        loadChildren: () =>
          import('../review/review.module').then((mod) => mod.ReviewModule),
      },
      {
        path: 'add-books',
        loadChildren: () =>
          import('../add-books/add-books.module').then(
            (mod) => mod.AddBooksModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then(
            (mod) => mod.CalendarModule
          ),
      },
      {
        path: 'books-ranking',
        loadChildren: () =>
          import('../books-ranking/books-ranking.module').then(
            (mod) => mod.BooksRankingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
