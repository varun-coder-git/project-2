import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComplaintCategoryIssuesComponent } from './top-complaint-category-issues.component';

describe('TopComplaintCategoryIssuesComponent', () => {
  let component: TopComplaintCategoryIssuesComponent;
  let fixture: ComponentFixture<TopComplaintCategoryIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopComplaintCategoryIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComplaintCategoryIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
