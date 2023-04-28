/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChipApiService } from './chip-api.service';

describe('Service: ChipApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChipApiService]
    });
  });

  it('should ...', inject([ChipApiService], (service: ChipApiService) => {
    expect(service).toBeTruthy();
  }));
});
