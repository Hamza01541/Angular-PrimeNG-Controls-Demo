import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermNConditionComponent } from './term-n-condition.component';

describe('TermNConditionComponent', () => {
  let component: TermNConditionComponent;
  let fixture: ComponentFixture<TermNConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermNConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermNConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
