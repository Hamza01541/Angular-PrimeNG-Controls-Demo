import { TestBed } from '@angular/core/testing';

import { SearchingService } from './searching.service';

describe('SearchingService', () => {
  let service: SearchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
