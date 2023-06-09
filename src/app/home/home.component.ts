import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../service.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  title = "";
  books: any;
  loading: boolean = true;
  userLogged: boolean = false;

  constructor(private bookService: BookService, private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.title = this.getMessage();
    this.loadBooks();
    if (this.tokenStorageService.getToken()) {
      this.userLogged = true;
    }
  }

  getMessage() {

    var num = Math.floor(Math.random() * 9);
    var r_text = new Array (9);
    r_text[0] = "Share your stories, give adventures. Bring life to your books in hands of other reading lovers.";
    r_text[1] = "Sharing books means opening doors to a new world. Join our exchange community and share the reading pleasure.";
    r_text[2] = "Sharing books multiplies knowledge and passion. Join us and leave your books to inspire other readers.";
    r_text[3] = "Share the love of reading, pass your books to new owners and leave your stories to continue travelling.";
    r_text[4] = "Your favourite book could be someone else's treasure. Help us building a book exchange community and leave your literary treasures find new places.";
    r_text[5] = "Share one page, inspire somebody else. Join to our book exchange app and become a solidary reading ambassador.";
    r_text[6] = "The power of a shared book is unlimited. Join our community and discover the happiness of seeing your books touching other readers life.";
    r_text[7] = "Sharing books means feeding colective imagination. Join us and become part of literature cycle, where each book is a tireless traveller.";
    r_text[8] = "Share your books and build long-life literary connections. We create, together, a world where words never stop flowing.";
    r_text[9] = "The charm of a book multiplies when you share it. Join our exchange community and let it surprise by the stories that will arrive to your hands.";
    return r_text[num];
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
        this.books = this.getLastFourAvailableBooks().reverse();
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );
  }

  getLastFourAvailableBooks(): any[] {
    const availableBooks = this.books.filter((book: any) => book.aviable);
    const lastFourAvailableBooks = availableBooks.slice(-4);
    return lastFourAvailableBooks;
  }


}
