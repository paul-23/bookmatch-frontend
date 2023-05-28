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

  newBook: any = {};
  coverImage: Blob | null = null;

  coverImageBlob: Blob | null = null;

  ngOnInit() {
    this.loadEditorials();
  }

  createBook() {
    const formData = new FormData();
    const book = {
      author: this.newBook.author,
      title: this.newBook.title,
      isbn: this.newBook.isbn,
      category: this.newBook.category,
      //cover_image: this.newBook.cover_image,
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


    console.log(formData);
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
    const editorialName = this.edit;
    this.bookService.createEditorial(editorialName).subscribe(
      response => {
        console.log('Post created successfully', response);
        // Handle the response or perform additional actions
      },
      error => {
        console.error('Error creating post', error);

        // Meter texto rojo o algo visual aqui
      }
    );
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
