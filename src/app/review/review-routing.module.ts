import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { ReviewFormGuard } from '../guards/review-form.guard';

const routes: Routes = [
  {
    path: '',
    component: ReviewComponent,
  },
  {
    path: ':book.id',
    component: ReviewComponent,
    canDeactivate: [ReviewFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
