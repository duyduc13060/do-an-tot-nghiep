/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaseApiService } from './case-api.service';

describe('Service: CaseApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseApiService]
    });
  });

  it('should ...', inject([CaseApiService], (service: CaseApiService) => {
    expect(service).toBeTruthy();
  }));
});
