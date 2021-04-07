import { TestBed } from '@angular/core/testing';

import { GerenteGuard } from './gerente.guard';

describe('GerenteGuard', () => {
  let guard: GerenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GerenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
