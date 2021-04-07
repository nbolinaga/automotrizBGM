import { TestBed } from '@angular/core/testing';

import { MecanicoGuard } from './mecanico.guard';

describe('MecanicoGuard', () => {
  let guard: MecanicoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MecanicoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
