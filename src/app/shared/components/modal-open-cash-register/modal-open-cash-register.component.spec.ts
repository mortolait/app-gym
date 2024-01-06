import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpenCashRegisterComponent } from './modal-open-cash-register.component';

describe('ModalOpenCashRegisterComponent', () => {
  let component: ModalOpenCashRegisterComponent;
  let fixture: ComponentFixture<ModalOpenCashRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpenCashRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOpenCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
