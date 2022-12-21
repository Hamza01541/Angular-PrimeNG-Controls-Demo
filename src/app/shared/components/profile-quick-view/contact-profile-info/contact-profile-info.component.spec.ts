import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProfileInfoComponent } from './contact-profile-info.component';

describe('ContactProfileInfoComponent', () => {
  let component: ContactProfileInfoComponent;
  let fixture: ComponentFixture<ContactProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactProfileInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
