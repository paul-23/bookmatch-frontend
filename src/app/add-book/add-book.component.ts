import { Component } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
  editorials: any;
  showPopup = false;
  inputValue: string = "";
  constructor(private bookService: BookService, private tokenStorageService: TokenStorageService) {}
  name: any;
  edit: any;

  title: any;
  author: any;
  isbn: any;
  category: any;
  image: any;
  editorial: any;

  editorialError:boolean = false;
  bookError:boolean = false;

  newBook: any = {};
  coverImage: Blob | null = null;

  coverImageBlob: Blob | null = null;

  ngAfterViewInit() {
    this.loadEditorials();
  }

  createBook() {
    const formData = new FormData();

    if (!this.newBook.title || !this.newBook.author || !this.newBook.isbn || !this.newBook.category) {
      console.error('Error: Los campos deben estar completos.');
      this.bookError = true;
      return;
    }

    const book = {
      author: this.newBook.author,
      title: this.newBook.title,
      isbn: this.newBook.isbn,
      category: this.newBook.category,
      //cover_image: this.newBook.cover_image,
      aviable: true,
      description: this.newBook.description,
      user: {
        id_user: this.tokenStorageService.getUser().id
      },
      editorial: {
        id_editorial: 1
      }
    };

    formData.append('image', this.newBook.cover_image);
    formData.append('book', JSON.stringify(book));

    this.bookService.createBook(formData);
  }


onFileSelected(event: any) {
    this.newBook.cover_image = event.target.files[0];

  }

  /*convertToBlob(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
      this.coverImageBlob = blob;
    };
    reader.readAsArrayBuffer(file);
  }*/

  createEditorial(): void {
    this.editorialError = false;
    const editorialName = this.edit;
    if (editorialName !== null && editorialName !== undefined && editorialName !== '') {
      this.bookService.createEditorial(editorialName).subscribe(
        response => {
          console.log('Post created successfully', response);
          this.loadEditorials();
        },
        error => {
          this.editorialError = true;
          console.error('Error creating post', error);
        }
      );
    } else {
      this.editorialError = true;
    }
  }

  getRndom() {
    return Math.floor(Math.random() * 5 + 1);
  }

  loadEditorials() {
    this.bookService.getEditorials().subscribe(
      (response) => {
        this.editorials = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  postEditorial(){

  }
}
