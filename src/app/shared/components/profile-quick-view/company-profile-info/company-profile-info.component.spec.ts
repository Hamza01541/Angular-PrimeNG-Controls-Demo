import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileInfoComponent } from './company-profile-info.component';

describe('CompanyProfileInfoComponent', () => {
  let component: CompanyProfileInfoComponent;
  let fixture: ComponentFixture<CompanyProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProfileInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
