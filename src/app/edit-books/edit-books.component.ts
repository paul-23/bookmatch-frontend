import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BookService } from '../rick-morty.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit {
  book: any;
  newBook: any;
  id_book: any;
  selected: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.id_book = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(this.id_book).subscribe(
      (response) => {
        this.book = response;
        this.newBook = { ...this.book };
        console.log(this.newBook.cover_image);
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  updateBook() {
    const updatedBook = {
      title: this.newBook.title,
      author: this.newBook.author,
      isbn: this.newBook.isbn,
      category: this.newBook.category,
      aviable: this.newBook.aviable,
      description: this.newBook.description
    };

    const formData = new FormData();
    formData.append('book', JSON.stringify(updatedBook));

    if (this.newBook.cover_image) {
      formData.append('image', this.newBook.cover_image);
    } else {
      formData.append('image', this.book.cover_image);
    }

    this.bookService.updateBook(formData, this.id_book).subscribe(
      (response) => {
        console.log('Libro actualizado exitosamente');
        this.router.navigate(['/books']);
      },
      (error) => {
        console.log('Error al actualizar el libro');
      }
    );
  }


  onFileSelected(event: any) {
    if (event.target.files[0] && event.target.files[0].size > 0) {
      this.newBook.cover_image = event.target.files[0];
      this.selected = true;
    }
  }


}
