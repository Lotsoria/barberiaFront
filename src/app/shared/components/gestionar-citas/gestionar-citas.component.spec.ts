import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCitasComponent } from './gestionar-citas.component';

describe('GestionarCitasComponent', () => {
  let component: GestionarCitasComponent;
  let fixture: ComponentFixture<GestionarCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarCitasComponent]
    });
    fixture = TestBed.createComponent(GestionarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
