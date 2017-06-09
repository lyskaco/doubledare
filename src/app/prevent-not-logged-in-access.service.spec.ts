import { TestBed, inject } from '@angular/core/testing';

import { PreventNotLoggedInAccessService } from './prevent-not-logged-in-access.service';

describe('PreventNotLoggedInAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventNotLoggedInAccessService]
    });
  });

  it('should ...', inject([PreventNotLoggedInAccessService], (service: PreventNotLoggedInAccessService) => {
    expect(service).toBeTruthy();
  }));
});
