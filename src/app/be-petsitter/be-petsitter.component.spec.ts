import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BePetsitterComponent } from './be-petsitter.component';

describe('BePetsitterComponent', () => {
  let component: BePetsitterComponent;
  let fixture: ComponentFixture<BePetsitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BePetsitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BePetsitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
