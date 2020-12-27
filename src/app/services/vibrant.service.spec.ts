import { TestBed } from '@angular/core/testing';

import { VibrantService } from './vibrant.service';

describe('VibrantService', () => {
  let service: VibrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VibrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
