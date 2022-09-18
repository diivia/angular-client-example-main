import { TestBed } from '@angular/core/testing';

import { TextKeyService } from './text-key.service';

describe('TextkeyService', () => {
  let service: TextKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
