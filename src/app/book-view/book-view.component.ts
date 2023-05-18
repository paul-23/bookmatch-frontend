import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit{

  book: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private bookService: BookService){}
  ngOnInit(): void {
    let id_book = this._route.snapshot.paramMap.get('id_book');
    this.bookService.getBookByID(id_book).subscribe(
      (response) => {
        this.book = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }
  onBack(): void{
    this._router.navigate(['/books']);
  }
}
