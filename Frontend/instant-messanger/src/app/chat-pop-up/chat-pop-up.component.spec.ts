import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPopUpComponent } from './chat-pop-up.component';

describe('ChatPopUpComponent', () => {
  let component: ChatPopUpComponent;
  let fixture: ComponentFixture<ChatPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
