import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsFriendsComponent } from './suggestions-friends.component';

describe('SuggestionsFriendsComponent', () => {
  let component: SuggestionsFriendsComponent;
  let fixture: ComponentFixture<SuggestionsFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsFriendsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
