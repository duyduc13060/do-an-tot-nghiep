/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PcService } from './pc.service';

describe('Service: Pc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcService]
    });
  });

  it('should ...', inject([PcService], (service: PcService) => {
    expect(service).toBeTruthy();
  }));
});
