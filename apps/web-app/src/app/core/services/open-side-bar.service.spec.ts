import { TestBed } from '@angular/core/testing';

import { OpenSideBarService } from './open-side-bar.service';

describe('OpenSideBarService', () => {
  let service: OpenSideBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenSideBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
