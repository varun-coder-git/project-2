import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotDetailsComponent } from './chatbot-details.component';

describe('ChatbotDetailsComponent', () => {
  let component: ChatbotDetailsComponent;
  let fixture: ComponentFixture<ChatbotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
