import { TestBed } from '@angular/core/testing';

import { FillterService } from './fillter.service';

describe('FillterService', () => {
  let service: FillterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
