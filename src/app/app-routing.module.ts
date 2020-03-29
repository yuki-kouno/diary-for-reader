import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(mod => mod.WelcomeModule)
  },
  {
    path: 'review',
    loadChildren: () =>
      import('./review/review.module').then(mod => mod.ReviewModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then(mod => mod.LibraryModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'add-books',
    loadChildren: () =>
      import('./add-books/add-books.module').then(mod => mod.AddBooksModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then(mod => mod.CalendarModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
