import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BookComponent implements OnInit {
  books: any;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadRndomBooks();
  }

  getRndom() {
    return Math.floor(Math.random() * 5 + 1);
  }

  loadRndomBooks() {
    this.bookService.get8RndomBooks().subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }
}
