/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VgaApiService } from './vga-api.service';

describe('Service: VgaApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VgaApiService]
    });
  });

  it('should ...', inject([VgaApiService], (service: VgaApiService) => {
    expect(service).toBeTruthy();
  }));
});
