import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit{
  book: any;

  constructor(private _router: Router,private _route: ActivatedRoute,private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let id_book = this._route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(id_book).subscribe(
      (response) => {
        this.book = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.book.image_cover}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  postBook(){

  }
}
