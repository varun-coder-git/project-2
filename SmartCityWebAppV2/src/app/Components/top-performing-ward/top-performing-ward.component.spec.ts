import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingWardComponent } from './top-performing-ward.component';

describe('TopPerformingWardComponent', () => {
  let component: TopPerformingWardComponent;
  let fixture: ComponentFixture<TopPerformingWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPerformingWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPerformingWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
