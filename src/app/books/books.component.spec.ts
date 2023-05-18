import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BookComponent } from './books.component';

describe('BooksComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent]
    });

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
