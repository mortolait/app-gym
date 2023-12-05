import { TestBed } from '@angular/core/testing';

import { ContractResolver } from './contract.resolver';

describe('ContractResolver', () => {
  let resolver: ContractResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContractResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
