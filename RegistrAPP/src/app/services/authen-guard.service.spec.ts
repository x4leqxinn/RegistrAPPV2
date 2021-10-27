import { TestBed } from '@angular/core/testing';

import { AuthenGuardService } from './authen-guard.service';

describe('AuthenGuardService', () => {
  let service: AuthenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
