import { Component } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
  constructor(private bookService: BookService, private tokenStorageService: TokenStorageService,
    private router: Router, private toastr: ToastrService) {}

  editorials: any;
  showPopup = false;
  inputValue: string = "";

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

  ngOnInit(){
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.loadEditorials();
  }

  createBook() {
    const selectedEditorialName = this.newBook.editorial;
    const selectedEditorial = this.editorials.find((editorial: any) => editorial.name_editorial === selectedEditorialName);

    if (selectedEditorial){
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
      aviable: true,
      description: this.newBook.description,
      user: {
        id_user: this.tokenStorageService.getUser().id
      },
      editorial: {
        id_editorial: selectedEditorial.id_editorial

      }


    };


    formData.append('image', this.newBook.cover_image);
    formData.append('book', JSON.stringify(book));
    this.bookService.createBook(formData).subscribe(
      (response) => {
        console.log('Book created successfully', response);
        this.router.navigate(['/']);
        // Handle success
      },
      (error) => {
        console.error('Error creating book', error);
        // Handle error
      }
    );
  } else{
    console.log("editorial incorrecta, seleccione o cree una editorial");
  }
  }

onFileSelected(event: any) {
    this.newBook.cover_image = event.target.files[0];

  }

  createEditorial(): void {
    this.editorialError = false;
    const editorialName = this.edit;
    if (editorialName !== null && editorialName !== undefined && editorialName !== '') {
      this.bookService.createEditorial(editorialName).subscribe(
        response => {
          this.toastr.success('Editorial created successfully');
          this.loadEditorials();
        },
        error => {
          this.toastr.error('Error creating Editorial');
          this.editorialError = true;
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
}
