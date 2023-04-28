/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PsuApiService } from './psu-api.service';

describe('Service: PsuApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PsuApiService]
    });
  });

  it('should ...', inject([PsuApiService], (service: PsuApiService) => {
    expect(service).toBeTruthy();
  }));
});
