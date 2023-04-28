import { TestBed } from '@angular/core/testing';

import { HdService } from './hd.service';

describe('HdService', () => {
  let service: HdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
