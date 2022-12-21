import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentContactsAndAccountsComponent } from './recent-contacts-and-accounts.component';

describe('RecentContactsAndAccountsComponent', () => {
  let component: RecentContactsAndAccountsComponent;
  let fixture: ComponentFixture<RecentContactsAndAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentContactsAndAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentContactsAndAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
