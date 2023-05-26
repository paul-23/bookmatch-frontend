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

  ngOnInit() {
    this.loadEditorials();
  }


  createBook(): void {
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
