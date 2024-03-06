import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarComponent } from './gestionar.component';

describe('GestionarComponent', () => {
  let component: GestionarComponent;
  let fixture: ComponentFixture<GestionarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarComponent]
    });
    fixture = TestBed.createComponent(GestionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
