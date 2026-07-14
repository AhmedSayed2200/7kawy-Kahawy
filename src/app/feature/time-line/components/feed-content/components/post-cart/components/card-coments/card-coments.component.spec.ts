import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComentsComponent } from './card-coments.component';

describe('CardComentsComponent', () => {
  let component: CardComentsComponent;
  let fixture: ComponentFixture<CardComentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
