import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBooksComponent } from './user-books.component';

describe('UserBooksComponent', () => {
  let component: UserBooksComponent;
  let fixture: ComponentFixture<UserBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBooksComponent]
    });
    fixture = TestBed.createComponent(UserBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
