import { TestBed } from '@angular/core/testing';

import { DatabaseRankingBooksService } from './database-ranking-books.service';

describe('DatabaseRankingBooksService', () => {
  let service: DatabaseRankingBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseRankingBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
