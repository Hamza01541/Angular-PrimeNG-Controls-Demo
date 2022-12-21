import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndVerifyComponent } from './search-and-verify.component';

describe('SearchAndVerifyComponent', () => {
  let component: SearchAndVerifyComponent;
  let fixture: ComponentFixture<SearchAndVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAndVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
