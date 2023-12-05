import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilContractComponent } from './perfil-contract.component';

describe('PerfilContractComponent', () => {
  let component: PerfilContractComponent;
  let fixture: ComponentFixture<PerfilContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
