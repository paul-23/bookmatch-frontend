import { HttpClient,HttpHeaders } from '@angular/common/http';
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

    const token = sessionStorage.getItem('token');
    let header = this.bookService.getHeader(token);

    this.loadRndomBooks();
  }


  getRndom() {
    return Math.floor(Math.random() * 5 + 1);
  }

  loadRndomBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }
}
