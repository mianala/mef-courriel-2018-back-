import { TestBed, inject } from '@angular/core/testing';

import { FroalaService } from './froala.service';

describe('FroalaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FroalaService]
    });
  });

  it('should be created', inject([FroalaService], (service: FroalaService) => {
    expect(service).toBeTruthy();
  }));
});
