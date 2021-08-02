import { TestBed } from '@angular/core/testing';

import { PoductDetailsResolver } from './poduct-details-resolver';

describe('PoductDetailsResolver', () => {
  let service: PoductDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoductDetailsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
