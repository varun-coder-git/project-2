import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintChangeLocationMapComponent } from './complaint-change-location-map.component';

describe('ComplaintChangeLocationMapComponent', () => {
  let component: ComplaintChangeLocationMapComponent;
  let fixture: ComponentFixture<ComplaintChangeLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintChangeLocationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintChangeLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
