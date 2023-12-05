import { TestBed } from '@angular/core/testing';

import { ServiceProvided } from './service.service';

describe('ServiceService', () => {
  let service: ServiceProvided;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProvided);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
