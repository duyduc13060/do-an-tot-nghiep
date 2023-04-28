/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageApiService } from './image-api.service';

describe('Service: ImageApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageApiService]
    });
  });

  it('should ...', inject([ImageApiService], (service: ImageApiService) => {
    expect(service).toBeTruthy();
  }));
});
