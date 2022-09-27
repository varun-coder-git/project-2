import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintConfiguarationScreenComponent } from './complaint-configuaration-screen.component';

describe('ComplaintConfiguarationScreenComponent', () => {
  let component: ComplaintConfiguarationScreenComponent;
  let fixture: ComponentFixture<ComplaintConfiguarationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintConfiguarationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintConfiguarationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
