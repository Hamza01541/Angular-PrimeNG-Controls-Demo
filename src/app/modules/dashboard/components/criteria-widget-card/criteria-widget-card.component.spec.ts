import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaWidgetCardComponent } from './criteria-widget-card.component';

describe('DashboardComponent', () => {
  let component: CriteriaWidgetCardComponent;
  let fixture: ComponentFixture<CriteriaWidgetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaWidgetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaWidgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
