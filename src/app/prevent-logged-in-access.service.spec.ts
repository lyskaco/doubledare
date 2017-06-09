import { TestBed, inject } from '@angular/core/testing';

import { PreventLoggedInAccessService } from './prevent-logged-in-access.service';

describe('PreventLoggedInAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventLoggedInAccessService]
    });
  });

  it('should ...', inject([PreventLoggedInAccessService], (service: PreventLoggedInAccessService) => {
    expect(service).toBeTruthy();
  }));
});
