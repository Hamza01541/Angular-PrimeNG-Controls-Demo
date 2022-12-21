import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailConfirmationComponent } from './verify-email-confirmation.component';

describe('VerifyEmailConfirmationComponent', () => {
  let component: VerifyEmailConfirmationComponent;
  let fixture: ComponentFixture<VerifyEmailConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
