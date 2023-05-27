import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BookComponent implements OnInit {
  books: any;
  loading: boolean = true;
  input_text: string;
  filteredBooks: [] = [];
  searchText: string = '';
  searchError: boolean = false;

  constructor(private _router: Router, private bookService: BookService) {
    this.input_text = '';
  }

  ngOnInit() {

    const token = sessionStorage.getItem('token');
    let header = this.bookService.getHeader(token);

    this.loadRndomBooksDelayed();
  }

  loadRndomBooksDelayed() {
    setTimeout(() => {
      this.loadRndomBooks();
    }, 1000);
  }

  searchBooks() {
    this.filteredBooks = this.books.filter((book: { available: any; title: string; }) =>
      book.available && book.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getRndom() {
    return Math.floor(Math.random() * 5 + 1);
  }

  loadRndomBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );
  }

  performSearch() {
    if (this.input_text && this.input_text.trim() !== '') {
      this.input_text = this.input_text.replace('%', ' ');
      this._router.navigate(['/search', this.input_text]);
      this.searchError = false;
    } else {
      this.searchError = true;
      setTimeout(() => {
        this.searchError = false;
      }, 5000);
    }
  }
}
