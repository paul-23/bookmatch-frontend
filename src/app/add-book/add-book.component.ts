import { Component } from '@angular/core';
import { BookService } from '../rick-morty.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
  editorials: any;
  showPopup = false;
  inputValue: string = "";
  constructor(private bookService: BookService) {}
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
    console.log(this.newBook.cover_image);
    const book = {
      author: 'JNKFASDASDJNIKLDFSJNKLFSD1',
      title: 'Título del Libro 1',
      isbn: '9788466360081',
      category: 'Categoría 1',
      //cover_image: this.newBook.cover_image,
      description: 'Descripción del Libro 1',
      user: {
        id_user: 1
      },
      editorial: {
        id_editorial: 1
      }
    };
    console.log(this.newBook.cover_image);
    //formData.append('book', new Blob([JSON.stringify(book)], { type: 'application/json' }));
    formData.append('book', new Blob([JSON.stringify(book)]));
    formData.append('book', this.newBook.cover_image, 'cover_image');

    console.log(formData);
    this.bookService.createBook(formData);
  }

onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // Access the file data as base64 string
        const base64String = fileReader.result as string;
        // Do something with the base64String or the file itself
        //this.newBook.cover_image = base64String;

        const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
        const byteCharacters = atob(base64String.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: mimeType });
        this.newBook.cover_image = blob;
      };
    }
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
