import { TestBed } from '@angular/core/testing';

import { SearchUtilityService } from './search-utility.service';

describe('SearchUtilityService', () => {
  let service: SearchUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
