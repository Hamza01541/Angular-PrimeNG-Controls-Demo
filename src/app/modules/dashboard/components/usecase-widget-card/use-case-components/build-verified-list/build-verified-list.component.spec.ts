import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildVerifiedListComponent } from './build-verified-list.component';

describe('BuildVerifiedListComponent', () => {
  let component: BuildVerifiedListComponent;
  let fixture: ComponentFixture<BuildVerifiedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildVerifiedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildVerifiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
