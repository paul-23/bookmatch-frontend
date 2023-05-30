import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  books: any;
  loading: boolean = true;
  input_text: string;
  filteredBooks: [] = [];
  searchText: string = '';
  searchError: boolean = false;

  constructor(private _router: Router, private _route: ActivatedRoute, private bookService: BookService, private sanitizer: DomSanitizer) {
    this.input_text = '';
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

    let text = this._route.snapshot.paramMap.get('id');
    console.log(text);

    /* Title */
    this.bookService.getBookByTitle(text).subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );

    /* Author */
    this.bookService.getBookByAuthor(text).subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );

    /* ISBN */
    this.bookService.getBookByISBN(text).subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar datos');
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
