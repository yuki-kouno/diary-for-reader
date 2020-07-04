import { TestBed } from '@angular/core/testing';

import { DatabaseReviewsService } from './database-reviews.service';

describe('DatabaseReviewsService', () => {
  let service: DatabaseReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
