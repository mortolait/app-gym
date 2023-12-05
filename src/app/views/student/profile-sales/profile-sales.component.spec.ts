import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSalesComponent } from './profile-sales.component';

describe('ProfileSalesComponent', () => {
  let component: ProfileSalesComponent;
  let fixture: ComponentFixture<ProfileSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
