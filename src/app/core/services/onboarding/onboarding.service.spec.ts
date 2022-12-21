import { TestBed } from '@angular/core/testing';
import { OnBoardingService } from './onboarding.service';


describe('OnBoardingService', () => {
  let service: OnBoardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnBoardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
