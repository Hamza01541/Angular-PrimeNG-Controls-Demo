import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarMenuComponent } from './right-sidebar-menu.component';

describe('RightSidebarMenuComponent', () => {
  let component: RightSidebarMenuComponent;
  let fixture: ComponentFixture<RightSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSidebarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
