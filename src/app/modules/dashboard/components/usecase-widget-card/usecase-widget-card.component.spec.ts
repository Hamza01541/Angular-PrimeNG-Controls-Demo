import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsecaseWidgetCardComponent } from './usecase-widget-card.component';

describe('DashboardComponent', () => {
  let component: UsecaseWidgetCardComponent;
  let fixture: ComponentFixture<UsecaseWidgetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsecaseWidgetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecaseWidgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
