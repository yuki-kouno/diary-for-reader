import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((mod) => mod.WelcomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./shell/shell.module').then((mod) => mod.ShellModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
