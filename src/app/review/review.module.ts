import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogChoiceBookComponent } from './dialog-choice-book/dialog-choice-book.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewsComponent } from './reviews/reviews.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';

@NgModule({
  declarations: [
    ReviewComponent,
    DialogChoiceBookComponent,
    ReviewsComponent,
    AllReviewsComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [DatePipe],
  entryComponents: [DialogChoiceBookComponent],
})
export class ReviewModule {}
