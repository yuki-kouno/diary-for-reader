import { TestBed } from '@angular/core/testing';

import { AmazonService } from './amazon.service';

describe('AmazonService', () => {
  let service: AmazonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
