import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  book: any;
  loading: boolean = true;
  userRating: number = 0;
  userComment: string = '';


  constructor(private _router: Router, private _route: ActivatedRoute, private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadRndomBooksDelayed();
  }

  loadRndomBooksDelayed() {
    setTimeout(() => {
      this.loadBook();
    }, 1000);
  }

  loadBook() {
    let id_book = this._route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(id_book).subscribe(
      (response) => {
        this.book = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );
  }

  orderBook() {
    this.bookService.updateBookAvailability(this.book.id_book).subscribe(
      (response) => {
        console.log("bien");
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  // Método para asignar el rating seleccionado por el usuario
  public setUserRating(star: number) {
    this.userRating = star;
  }

  public submitRating() {
    if (this.userRating) {
      const newRating = {
        rating: this.userRating,
        comment: this.userComment
      };
      /*this.bookService.addRating(this.book.id, newRating).subscribe(
        (response: any) => {
          this.book.total_rating += this.userRating;
          this.book.ratings.push(newRating);
          this.userRating = 0;
          this.userComment = '';
        },
        (error: any) => {
          console.log('Error al cargar datos:', error);
        }
      );*/
    }
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.book.image_cover}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onBack(): void {
    this._router.navigate(['/books']);
  }
}
