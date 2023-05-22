import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{

books: any;

    constructor(private _router: Router,private _route: ActivatedRoute,private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let text = this._route.snapshot.paramMap.get('id');
    console.log(text);

    /* Title */
    this.bookService.getBookByTitle(text).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );

    /* Author */
    this.bookService.getBookByAuthor(text).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );

    /* ISBN */
    this.bookService.getBookByISBN(text).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }


}
