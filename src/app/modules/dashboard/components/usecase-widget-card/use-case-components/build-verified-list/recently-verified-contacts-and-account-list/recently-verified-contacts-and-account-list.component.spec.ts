import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyVerifiedContactsAndAccountListComponent } from './recently-verified-contacts-and-account-list.component';

describe('VerifiedListComponent', () => {
  let component: RecentlyVerifiedContactsAndAccountListComponent;
  let fixture: ComponentFixture<RecentlyVerifiedContactsAndAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyVerifiedContactsAndAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyVerifiedContactsAndAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
