import { TestBed } from '@angular/core/testing';

import { ReviewFormGuard } from './review-form.guard';

describe('ReviewFormGuard', () => {
  let guard: ReviewFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReviewFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
