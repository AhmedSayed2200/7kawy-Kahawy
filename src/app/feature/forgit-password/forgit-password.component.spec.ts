import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgitPasswordComponent } from './forgit-password.component';

describe('ForgitPasswordComponent', () => {
  let component: ForgitPasswordComponent;
  let fixture: ComponentFixture<ForgitPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgitPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgitPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
