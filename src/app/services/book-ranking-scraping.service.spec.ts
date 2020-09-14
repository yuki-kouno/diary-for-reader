import { TestBed } from '@angular/core/testing';

import { BookRankingScrapingService } from './book-ranking-scraping.service';

describe('BookRankingScrapingService', () => {
  let service: BookRankingScrapingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRankingScrapingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
