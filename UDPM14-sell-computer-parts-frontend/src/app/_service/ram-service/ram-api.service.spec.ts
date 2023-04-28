/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RamApiService } from './ram-api.service';

describe('Service: RamApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RamApiService]
    });
  });

  it('should ...', inject([RamApiService], (service: RamApiService) => {
    expect(service).toBeTruthy();
  }));
});
