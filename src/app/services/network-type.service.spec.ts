import { TestBed } from '@angular/core/testing';

import { NetworkTypeService } from './network-type.service';

describe('NetworktypeService', () => {
  let service: NetworkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
