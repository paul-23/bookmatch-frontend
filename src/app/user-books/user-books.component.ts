import { Component, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  user: any;
  books: any;
  userLogged = false;
  showToast = false;
  selectedBook: any;
  profileImage: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.getUserByID(this.user.id);
      }
    });
  }

  showAndHideToast(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }

  deleteBook(id: any) {
    this.bookService.deleteBookByID(id).subscribe(
      (response: any) => {
        if (response && response.success === true && response.message === 'Book deleted successfully') {
          this.loadBooksByUserID(this.user.id_user);
          this.showToast = true;
          console.log('Libro eliminado correctamente');
        } else {
          console.log('Error al eliminar el libro:', response);
        }
      },
      (error) => {
        console.log('Error al eliminar el libro:', error);
      }
    );
  }

  loadBooksByUserID(id_user: any) {
    this.bookService.getBooksByUserID(id_user).subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error al cargar los libros', error);
      }
    );
  }

  getUserByID(id: any) {
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser();
      this.bookService.getUserByID(this.user.id).subscribe(
        (response) => {
          this.user = response;
          this.profileImage = this.getBase64ImageSrc(this.user?.profile_image);
          this.loadBooksByUserID(this.user.id_user);
        },
        () => {
          console.log('Error al cargar datos');
        }
      );
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  updateBookAvailability(id: number) {
    this.bookService.updateBookAvailability(id).subscribe(
      (response) => {
        this.loadBooksByUserID(this.user.id_user);
        console.log('Libro actualizado correctamente');
      },
      (error) => {
        console.log('Error al actualizar el libro:', error);
      }
    );
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
