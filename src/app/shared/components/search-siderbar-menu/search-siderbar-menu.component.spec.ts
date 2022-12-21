import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSiderbarMenuComponent } from './search-siderbar-menu.component';

describe('SearchSiderbarMenuComponent', () => {
  let component: SearchSiderbarMenuComponent;
  let fixture: ComponentFixture<SearchSiderbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSiderbarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSiderbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
