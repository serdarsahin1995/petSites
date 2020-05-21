import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessage2Component } from './send-message2.component';

describe('SendMessage2Component', () => {
  let component: SendMessage2Component;
  let fixture: ComponentFixture<SendMessage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMessage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
