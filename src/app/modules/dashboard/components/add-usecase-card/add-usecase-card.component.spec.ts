import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsecaseComponent } from './add-usecase-card.component';

describe('DashboardComponent', () => {
  let component: AddUsecaseComponent;
  let fixture: ComponentFixture<AddUsecaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsecaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
