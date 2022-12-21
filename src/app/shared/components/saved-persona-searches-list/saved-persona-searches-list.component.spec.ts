import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPersonaSearchesListComponent } from './saved-persona-searches-list.component';

describe('SavedPersonaSearchesListComponent', () => {
  let component: SavedPersonaSearchesListComponent;
  let fixture: ComponentFixture<SavedPersonaSearchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPersonaSearchesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPersonaSearchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
