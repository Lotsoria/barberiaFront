import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientesModalComponent } from './update-clientes-modal.component';

describe('UpdateClientesModalComponent', () => {
  let component: UpdateClientesModalComponent;
  let fixture: ComponentFixture<UpdateClientesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClientesModalComponent]
    });
    fixture = TestBed.createComponent(UpdateClientesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
