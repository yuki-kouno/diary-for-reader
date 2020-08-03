import { TestBed } from '@angular/core/testing';

import { SearchLibraryService } from './search-library.service';

describe('SearchLibraryService', () => {
  let service: SearchLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
