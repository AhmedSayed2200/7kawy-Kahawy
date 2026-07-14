import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigthSideBarComponent } from './rigth-side-bar.component';

describe('RigthSideBarComponent', () => {
  let component: RigthSideBarComponent;
  let fixture: ComponentFixture<RigthSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigthSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RigthSideBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
