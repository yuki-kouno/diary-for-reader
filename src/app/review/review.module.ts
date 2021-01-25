import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewFormComponent } from './review-form/review-form.component';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { ReviewListComponent } from './review-list/review-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RemoveReviewDialogComponent } from './remove-review-dialog/remove-review-dialog.component';
import { AllReviewListComponent } from './all-review-list/all-review-list.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ReviewComponent,
    ReviewFormComponent,
    ReviewListComponent,
    RemoveReviewDialogComponent,
    AllReviewListComponent,
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
    MatSnackBarModule,
    AutofocusFixModule.forRoot(),
    MatDividerModule,
  ],
  providers: [DatePipe],
})
export class ReviewModule {}
