import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
  constructor(
    private bookService: BookService,
    private tokenStorageService: TokenStorageService,
    private router: Router, private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  editorials: any;
  showPopup = false;
  inputValue: string = "";
  selected: boolean = false;
  previewImage: SafeUrl | null = null;
  typeFileError: boolean = false;
  deleteCover: boolean = false;

  name: any;
  edit: any;
  title: any;
  author: any;
  isbn: any;
  category: any;
  image: any;
  editorial: any;

  editorialError: boolean = false;
  bookError: boolean = false;
  userLogged: boolean = false;

  newBook: any = {};
  coverImage: Blob | null = null;
  coverImageBlob: Blob | null = null;

  submitted: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.tokenStorageService.getToken()) {
      this.userLogged = true;
    }
  }

  ngAfterViewInit() {
    this.loadEditorials();
  }

  createBook(registerForm: NgForm): void {
    if (registerForm.invalid) {
      this.toastr.error('There are empty or wrong fields', 'Error adding book');
      this.submitted = true;
      this.bookError = true;
      return;
    }

    const selectedEditorialName = this.newBook.editorial;
    const selectedEditorial = this.editorials.find((editorial: any) => editorial.name_editorial === selectedEditorialName);

    const formData = new FormData();

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
        this.toastr.success('You can edit it in your profile', 'Book added successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Error adding book');
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.newBook.cover_image = file;
      this.selected = true;
      this.previewImage = this.addImagePrefix(file);
      this.cdr.detectChanges();
    } else {
      this.typeFileError = true;
    }
  }

  deleteCoverImage() {
    this.newBook.cover_image = null;
    this.previewImage = null;
    this.deleteCover = true;
  }

  addImagePrefix(image: string | File): SafeUrl | null {
    if (image instanceof File) {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image));
    }

    if (image && !image.startsWith('data:image/')) {
      const extension = image.substr(0, 5) === '/9j/4' ? 'jpg' : 'png';
      return this.sanitizer.bypassSecurityTrustUrl('data:image/' + extension + ';base64,' + image);
    }

    return null;
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
