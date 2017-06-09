import { TestBed, inject } from '@angular/core/testing';

import { DialogServiceService } from './dialog-service.service';

describe('DialogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogServiceService]
    });
  });

  it('should ...', inject([DialogServiceService], (service: DialogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
