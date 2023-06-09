import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../service.service';
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
  @ViewChild('toastElement') toastElement: any;
  loading: boolean = true;
  notLogged: boolean = true;
  currentPage: number = 0;
  pageSize: number = 8;
  totalItems: number = 0;
  isLoadingMore: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    let id_user = this.route.snapshot.paramMap.get('id');
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser();
      if (this.user.id == id_user) {
        this.getUserByID(this.user.id);
      } else {
        this.getOtherUserByID(id_user);
      }
    } else {
      this.notLogged = false;
      this.loading = false;
    }
    window.scrollTo(0, 0);
  }

  showAndHideToast(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 8000);
  }

  deleteBook(id: any) {
    this.bookService.deleteBookByID(id).subscribe(
      (response: any) => {
        if (response && response.success === true && response.message === 'Book deleted successfully') {
          if (this.user.roleId === 'ROLE_ADMIN') {
            this.loadBooksAdmin();
          } else if (this.user.roleId === 'ROLE_USER') {
            this.loadBooksByUserID(this.user.id_user);
          } else {
            this.userLogged = false;
          }
          this.showAndHideToast();
          console.log('Libro eliminado correctamente');
        } else {
          console.log('Error al eliminar el libro1:', response);
        }
      },
      (error) => {
        console.log('Error al eliminar el libro2:', error);
      }
    );
  }

  /* --------------------- OWN PROFILE / BOOKS --------------------- */

  loadBooksByUserID(id_user: any) {
    this.bookService.getBooksByUserID(id_user).subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
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
          if (this.user.roleId === 'ROLE_ADMIN') {
            this.loadBooksAdmin();
          } else if (this.user.roleId === 'ROLE_USER') {
            this.loadBooksByUserID(this.user.id_user);
          } else {
            this.userLogged = false;
          }
          this.profileImage = this.getBase64ImageSrc(this.user?.profile_image);
          this.loading = false;
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

  /* --------------------- END OWN PROFILE / BOOKS --------------------- */

  /* --------------------- ADMIN --------------------- */

  @HostListener('window:scroll', [])
  onScroll(): void {
    const windowHeight = window.visualViewport?.height || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition + windowHeight >= documentHeight && !this.isLoadingMore) {
      this.loadMoreAdminBooks();
    }
  }


  loadBooksAdmin() {
    this.bookService.getBooksPagination(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.books = response;
        this.totalItems = response.length;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar los libros');
        this.loading = false;
      }
    );
  }

  loadMoreAdminBooks() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);

    if (this.currentPage < totalPages) {
      this.isLoadingMore = true;
      this.currentPage++;
      this.loading = true;

      this.bookService.getBooksPagination(this.currentPage, this.pageSize).subscribe(
        (response) => {
          this.books = this.books.concat(response);
          this.isLoadingMore = false;
          this.loading = false;
        },
        (error) => {
          console.log('Error al cargar más libros');
          this.isLoadingMore = false;
          this.loading = false;
        }
      );
    }
  }

  /* --------------------- END ADMIN --------------------- */

  /* --------------------- OTHER USER PROFILE --------------------- */

  getOtherUserByID(id: any) {
    this.bookService.getUserByID(id).subscribe(
      (response) => {
        this.user = response;
        this.profileImage = this.getBase64ImageSrc(this.user?.profile_image);
        this.loadBooksByUserID(this.user.id_user);
        this.loading = false;
      },
      () => {
        console.log('Error al cargar datos');
      }
    );
    this.userLogged = false;
  }

  /* --------------------- END OTHER USER PROFILE --------------------- */

  updateBookAvailability(id: number) {
    this.bookService.updateBookAvailability(id).subscribe(
      (response) => {
        if (this.user.roleId === 'ROLE_ADMIN') {
          this.loadBooksAdmin();
        } else if (this.user.roleId === 'ROLE_USER') {
          this.loadBooksByUserID(this.user.id_user);
        } else {
          this.userLogged = false;
        }
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
