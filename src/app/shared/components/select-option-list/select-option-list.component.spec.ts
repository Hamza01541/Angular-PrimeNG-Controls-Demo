import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionListComponent } from './select-option-list.component';

describe('SelectOptionListComponent', () => {
  let component: SelectOptionListComponent;
  let fixture: ComponentFixture<SelectOptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
