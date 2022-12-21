import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrodutionVideoModalComponent } from './introdution-video-modal.component';

describe('IntrodutionVideoModalComponent', () => {
  let component: IntrodutionVideoModalComponent;
  let fixture: ComponentFixture<IntrodutionVideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrodutionVideoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrodutionVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
