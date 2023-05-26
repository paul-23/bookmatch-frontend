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
  coverImage: File | null = null;

  coverImageBlob: Blob | null = null;

  ngOnInit() {
    this.loadEditorials();
  }

  createBook(){
    const formData = new FormData();

    formData.append('book', new Blob([JSON.stringify({
      author: 'JNKFASDASDJNIKLDFSJNKLFSD1',
      title: 'Título del Libro 1',
      isbn: '9788466360081',
      category: 'Categoría 1',
      description: 'Descripción del Libro 1',
      user: {
        id_user: 1
      },
      editorial: {
        id_editorial: 1
      }
    })], { type: 'application/json' }));


    formData.append('image', this.newBook.cover_image as File);
    console.log(formData);
    this.bookService.createBook(formData);

  }

onFileSelected(event: any) {
    const file = event.target.files[0];
    //this.convertToBlob(file);
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
