import { TestBed } from '@angular/core/testing';

import { DatabaseNewReleaseService } from './database-new-release.service';

describe('DatabaseNewReleaseService', () => {
  let service: DatabaseNewReleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseNewReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
