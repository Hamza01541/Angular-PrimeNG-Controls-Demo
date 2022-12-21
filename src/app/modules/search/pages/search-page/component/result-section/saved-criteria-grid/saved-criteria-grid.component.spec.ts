import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCriteriaGridComponent } from './saved-criteria-grid.component';

describe('SavedCriteriaGridComponent', () => {
  let component: SavedCriteriaGridComponent;
  let fixture: ComponentFixture<SavedCriteriaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCriteriaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCriteriaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
