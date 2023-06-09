import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { BookService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BookComponent implements OnInit {

  books: any[] = [];
  loading: boolean = true;
  input_text: string;
  filteredBooks: any[] = [];
  searchText: string = '';
  searchError: boolean = false;
  currentPage: number = 0;
  pageSize: number = 8;
  totalItems: number = 0;
  isLoadingMore: boolean = false;

  constructor(private _router: Router, private bookService: BookService, private renderer: Renderer2) {
    this.input_text = '';
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadBooks();
    this.renderer.listen('window', 'scroll', this.onScroll.bind(this));
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const windowHeight = window.visualViewport?.height || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition + windowHeight >= (documentHeight - 10) && !this.isLoadingMore) {
      this.loadMoreBooks();
    }
  }


  loadBooks() {
    this.bookService.getBooksPagination(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.books = response;
        this.totalItems = response.length;
        this.loading = false;
        this.books = this.getAviableBooks();
      },
      (error) => {
        console.log('Error al cargar los libros');
        this.loading = false;
      }
    );
  }

  loadMoreBooks() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);

    if (this.currentPage < totalPages) {
      this.isLoadingMore = true;
      this.currentPage++;
      this.loading = true;

      this.bookService.getBooksPagination(this.currentPage, this.pageSize).subscribe(
        (response) => {
          this.books = this.books.concat(response);
          this.isLoadingMore = false;
          this.books = this.getAviableBooks();
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

  getAviableBooks(): any[] {
    return this.books.filter((book: any) => book.aviable);
  }

  performSearch() {
    if (this.input_text && this.input_text.trim() !== '') {
      this.input_text = this.input_text.replace('%', ' ');
      this._router.navigate(['/search', this.input_text]);
      this.searchError = false;
    } else {
      this.searchError = true;
      setTimeout(() => {
        this.searchError = false;
      }, 5000);
    }
  }

}
