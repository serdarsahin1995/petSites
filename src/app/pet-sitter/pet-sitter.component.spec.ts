import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSitterComponent } from './pet-sitter.component';

describe('PetSitterComponent', () => {
  let component: PetSitterComponent;
  let fixture: ComponentFixture<PetSitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetSitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
