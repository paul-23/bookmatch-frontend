import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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
  selected: boolean = false;


  constructor(private tokenStorageService: TokenStorageService, private _router: Router,private _route: ActivatedRoute,
    private bookService: BookService, private sanitizer: DomSanitizer, private http: HttpClient) { }

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
      title: this.newBook.title,
      author: this.newBook.author,
      isbn: this.newBook.isbn,
      category: this.newBook.category
    };


    if (this.selected){
      console.log("newBook");
      console.log(this.newBook.cover_image);
      formData.append('image', this.newBook.cover_image);
    } else{
      console.log("book");
      console.log(this.book.cover_image);
      formData.append('image',this.book.cover_image);
    }
    formData.append('book', JSON.stringify(book2));
    this.bookService.updateBook(formData, this.id_book);
  }

  onFileSelected(event: any) {
    if (event.target.files[0] == null){
      this.newBook.cover_image = this.book.cover_image;
      this.selected = false;
    }else{
    this.newBook.cover_image = event.target.files[0];
    this.selected = true;
  }
  }



  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.book.image_cover}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
