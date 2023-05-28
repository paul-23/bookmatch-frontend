import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit{
  book: any;
  title: any;
  author: any;
  description: any;
  isbn: any;
  category: any;
  avilable: any;
  newBook: any = {};
  id_book: any;

  constructor(private tokenStorageService: TokenStorageService, private _router: Router,private _route: ActivatedRoute,
    private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id_book = this._route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(this.id_book).subscribe(
      (response) => {
        this.book = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }



  updateBook() {
    const formData = new FormData();
    const book2 = {
      author: this.newBook.author,
      title: this.newBook.title,
      isbn: this.newBook.isbn,
      category: this.newBook.category,
      editorial: {
        id_editorial: 1
      },

      description: this.newBook.description
    };
    console.log(book2);
    this.bookService.updateBook(book2, this.id_book);
  }



  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.book.image_cover}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
