/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HdApiService } from './hd-api.service';

describe('Service: HdApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HdApiService]
    });
  });

  it('should ...', inject([HdApiService], (service: HdApiService) => {
    expect(service).toBeTruthy();
  }));
});
