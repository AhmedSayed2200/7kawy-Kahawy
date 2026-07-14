import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { forwardGuard } from './forward-guard';

describe('forwardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => forwardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
