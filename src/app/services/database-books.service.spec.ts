import { TestBed } from '@angular/core/testing';

import { DatabaseBooksService } from './database-books.service';

describe('DatabaseBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseBooksService = TestBed.get(DatabaseBooksService);
    expect(service).toBeTruthy();
  });
});
