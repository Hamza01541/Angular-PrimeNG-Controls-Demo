import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSearchCriteriaComponent } from './saved-search-criteria.component';

describe('SavedSearchCriteriaComponent', () => {
  let component: SavedSearchCriteriaComponent;
  let fixture: ComponentFixture<SavedSearchCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedSearchCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
