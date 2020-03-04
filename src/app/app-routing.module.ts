import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'welcome',
    pathMatch: 'full',
    loadChildren: () =>
      import('./welcome/welcome.module').then(mod => mod.WelcomeModule)
  },
  {
    path: 'review',
    pathMatch: 'full',
    loadChildren: () =>
      import('./review/review.module').then(mod => mod.ReviewModule)
  },
  {
    path: 'library',
    pathMatch: 'full',
    loadChildren: () =>
      import('./library/library.module').then(mod => mod.LibraryModule)
  },
  {
    path: 'add-books',
    loadChildren: () =>
      import('./add-books/add-books.module').then(mod => mod.AddBooksModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
