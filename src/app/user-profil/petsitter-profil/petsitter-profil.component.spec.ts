import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsitterProfilComponent } from './petsitter-profil.component';

describe('PetsitterProfilComponent', () => {
  let component: PetsitterProfilComponent;
  let fixture: ComponentFixture<PetsitterProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsitterProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsitterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
