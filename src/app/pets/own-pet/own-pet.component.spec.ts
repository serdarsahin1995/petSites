import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPetComponent } from './own-pet.component';

describe('OwnPetComponent', () => {
  let component: OwnPetComponent;
  let fixture: ComponentFixture<OwnPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
