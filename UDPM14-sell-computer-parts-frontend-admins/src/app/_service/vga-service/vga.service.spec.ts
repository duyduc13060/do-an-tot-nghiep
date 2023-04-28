import { TestBed } from '@angular/core/testing';

import { VgaService } from './vga.service';

describe('VgaService', () => {
  let service: VgaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VgaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
