import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BookService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

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
  previewImage: SafeUrl | null = null;
  typeFileError: boolean = false;
  deleteCover: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id_book = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(this.id_book).subscribe(
      (response) => {
        this.book = response;
        this.newBook = { ...this.book };
        this.previewImage = this.addImagePrefix(this.newBook.cover_image);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  updateBook(registerForm: NgForm): void {
    if (registerForm.invalid) {
      this.toastr.error('There are empty or wrong fields', 'Error adding book');
      this.submitted = true;
      return;
    }

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

    if (!this.deleteCover) {
      formData.append('image', this.newBook.cover_image);
    } else {
      formData.append('deleteCover', 'true');
    }

    this.bookService.updateBook(formData, this.id_book).subscribe(
      (response) => {
        this.toastr.success('Book edited successfully');
        this.router.navigate(['/books']);
      },
      (error) => {
        this.toastr.error('Error editing Book');
        console.log('Error al actualizar el libro');
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.size > 16 * 1024 * 1024) {
      this.toastr.error('Error adding image', 'The image cannot exceed 16mb');
      this.newBook.cover_image = null;
      return;
    }
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

}
