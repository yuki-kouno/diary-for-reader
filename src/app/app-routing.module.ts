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
    path: 'create',
    pathMatch: 'full',
    loadChildren: () =>
      import('./create/create.module').then(mod => mod.CreateModule)
  },
  {
    path: 'review',
    pathMatch: 'full',
    loadChildren: () =>
      import('./review/review.module').then(mod => mod.ReviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
