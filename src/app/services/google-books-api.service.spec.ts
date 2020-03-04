import { TestBed } from '@angular/core/testing';

import { GoogleBooksApiService } from './google-books-api.service';

describe('GoogleBooksApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleBooksApiService = TestBed.get(GoogleBooksApiService);
    expect(service).toBeTruthy();
  });
});
