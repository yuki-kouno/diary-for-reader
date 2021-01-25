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
      !component.reviewListCount &&
      !component.allReviewCount &&
      !component.reviewFormComponet.editableCount
    ) {
      return true;
    }
    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
