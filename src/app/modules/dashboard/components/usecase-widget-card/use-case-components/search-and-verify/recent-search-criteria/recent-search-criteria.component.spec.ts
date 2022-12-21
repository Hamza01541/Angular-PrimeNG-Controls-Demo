import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchCriteriaComponent } from './recent-search-criteria.component';

describe('RecentSearchCriteriaComponent', () => {
  let component: RecentSearchCriteriaComponent;
  let fixture: ComponentFixture<RecentSearchCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentSearchCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
