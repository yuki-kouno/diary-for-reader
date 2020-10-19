import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReviewComponent } from '../review/review/review.component';

@Injectable({
  providedIn: 'root',
})
export class ReviewFormGuard implements CanDeactivate<ReviewComponent> {
  canDeactivate(component: ReviewComponent): Observable<boolean> | boolean {
    if (
      (component.reviewListComponent.editForm.pristine &&
        component.reviewFormComponet.answers.pristine) ||
      component.reviewFormComponet.isComplete
    ) {
      return true;
    } else {
      const confirmation = window.confirm(
        '作業中の内容が失われますがよろしいですか？'
      );
      return of(confirmation);
    }
  }
}
