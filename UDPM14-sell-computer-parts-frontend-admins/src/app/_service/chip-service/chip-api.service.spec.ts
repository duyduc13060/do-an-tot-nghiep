import { TestBed } from '@angular/core/testing';

import { ChipApiService } from './chip-api.service';

describe('ChipApiService', () => {
  let service: ChipApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChipApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
