import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardNeedImprovementComponent } from './ward-need-improvement.component';

describe('WardNeedImprovementComponent', () => {
  let component: WardNeedImprovementComponent;
  let fixture: ComponentFixture<WardNeedImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardNeedImprovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardNeedImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
