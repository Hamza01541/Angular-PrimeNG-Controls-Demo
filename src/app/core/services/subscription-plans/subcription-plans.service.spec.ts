import { TestBed } from '@angular/core/testing';

import { SubcriptionPlansService } from './subcription-plans.service';

describe('SubcriptionPlansService', () => {
  let service: SubcriptionPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcriptionPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
