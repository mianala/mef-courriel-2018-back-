import { TestBed, inject } from '@angular/core/testing';

import { XhrService } from './xhr.service';

describe('XhrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XhrService]
    });
  });

  it('should be created', inject([XhrService], (service: XhrService) => {
    expect(service).toBeTruthy();
  }));
});
