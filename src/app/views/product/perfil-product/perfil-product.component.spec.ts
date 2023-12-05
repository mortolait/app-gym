import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProductComponent } from './perfil-product.component';

describe('PerfilProductComponent', () => {
  let component: PerfilProductComponent;
  let fixture: ComponentFixture<PerfilProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
