import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideBarProfileComponent } from './left-side-bar-profile.component';

describe('LeftSideBarProfileComponent', () => {
  let component: LeftSideBarProfileComponent;
  let fixture: ComponentFixture<LeftSideBarProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSideBarProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftSideBarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
