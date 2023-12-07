import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationWppComponent } from './integration-wpp.component';

describe('IntegrationWppComponent', () => {
  let component: IntegrationWppComponent;
  let fixture: ComponentFixture<IntegrationWppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationWppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationWppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
