import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { backwardGuard } from './backward-guard';

describe('backwardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => backwardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
