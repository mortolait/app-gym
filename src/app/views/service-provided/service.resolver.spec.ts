import { TestBed } from '@angular/core/testing';

import { ServiceResolver } from './service.resolver';

describe('ServiceResolver', () => {
  let resolver: ServiceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServiceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
