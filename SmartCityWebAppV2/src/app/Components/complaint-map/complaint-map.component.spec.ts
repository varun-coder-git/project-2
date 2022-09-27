import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintMapComponent } from './complaint-map.component';

describe('ComplaintMapComponent', () => {
  let component: ComplaintMapComponent;
  let fixture: ComponentFixture<ComplaintMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
