import { TestBed } from '@angular/core/testing';

import { EmailVerifiedGuard } from './email-verified.guard';

describe('EmailVerifiedGuard', () => {
  let guard: EmailVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
