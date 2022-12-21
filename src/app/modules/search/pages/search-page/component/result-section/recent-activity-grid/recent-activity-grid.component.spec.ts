import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityGridComponent } from './recent-activity-grid.component';

describe('RecentActivityGridComponent', () => {
  let component: RecentActivityGridComponent;
  let fixture: ComponentFixture<RecentActivityGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentActivityGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
