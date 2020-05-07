import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMessageComponent } from './get-message.component';

describe('GetMessageComponent', () => {
  let component: GetMessageComponent;
  let fixture: ComponentFixture<GetMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
