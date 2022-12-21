import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStartSidemenuComponent } from './quick-start-sidemenu.component';

describe('FilterDatabaseSidemenuComponent', () => {
  let component: QuickStartSidemenuComponent;
  let fixture: ComponentFixture<QuickStartSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickStartSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickStartSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
