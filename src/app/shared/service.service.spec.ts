import { TestBed } from '@angular/core/testing';

import { ServiceShared } from './service.service';

describe('ServiceService', () => {
  let service: ServiceShared;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceShared);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
