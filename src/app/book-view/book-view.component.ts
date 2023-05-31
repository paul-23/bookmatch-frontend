import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})

export class BookViewComponent implements OnInit {

  book: any;
  loading: boolean = true;
  userRating: any;
  userComment: string = '';
  total_rating: any;
  user_ratings: any;
  id_book: any;
  user: any;
  userLogged: boolean = false;
  rated: boolean = false;
  noRatings: boolean = true;
  userHasRated: boolean = false;


  constructor(private _router: Router, private _route: ActivatedRoute, private bookService: BookService,
    private sanitizer: DomSanitizer, private tokenStorageService: TokenStorageService, private http: HttpClient,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userRating = 0;
    this.id_book = this._route.snapshot.paramMap.get('id');
    this._router.events.subscribe(() => {
      if (this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.userLogged = true;
      }
      this.stringNotRatings();
    });
    this.loadRndomBooksDelayed();
    this.loadRatings();
  }

  checkRatings() {
    for (const rating of this.user_ratings) {
      if (this.tokenStorageService.getUser().id_user == rating.id_user_rating) {
        console.log('Rated');
      }
    }
  }

  loadRndomBooksDelayed() {
    setTimeout(() => {
      this.loadBook();
    }, 1000);
  }

  postRating() {
    if (!this.userRating) {
      this.toastr.error('Please select a rating before submitting.', 'Select rating');
      return;
    }
    const formData = new FormData();
    const rating = {
      rating: this.userRating,
      comment: this.userComment,
      userRating: {
        id_user: this.tokenStorageService.getUser().id,
      },
      bookRating: {
        id_book: this.book.id_book
      }
    };

    formData.append('rating', JSON.stringify(rating));

    this.bookService.createRating(rating).subscribe(
      (response: any) => {
        this.toastr.success('Rating created successfully', 'Rating');
        this.loadRatings();
      },
      (error: any) => {
        this.toastr.error('You have already given a rating to this book', 'Rating error');
      }
    );

  }


  loadBook() {
    this.bookService.getBookByID(this.id_book).subscribe(
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

  loadRatings() {
    this.bookService.getAverageRatingByBookId(this.id_book).subscribe(
      (response) => {
        this.total_rating = response;
        this.stringNotRatings();
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );


    this.bookService.getRatingsByBookId(this.id_book).subscribe(
      (response) => {
        this.user_ratings = response;
        this.userHasRated = this.user_ratings.some((rating: any) => rating.userRating.id_user === this.user.id);
        console.log(this.user_ratings);
        this.stringNotRatings();
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );

    console.log(this.user_ratings);
    this.checkRatings();
  }

  stringNotRatings() {
    if (this.user_ratings.length > 0) {
      this.noRatings = false;
    } else {
      this.noRatings = true;
    }
  }

  orderBook() {
    this.bookService.updateBookNOTAvailability(this.book.id_book).subscribe(
      (response) => {
        this.loadBook();
        console.log("Libro reservado correctamente");
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  getStarArray(rating: number): any[] {
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;
    const totalStars = 5;
    let halfStar = false;
    let emptyStars = totalStars - fullStars;

    // Verificar si hay media estrella
    if (decimalPart >= 0.5) {
      halfStar = true;
      emptyStars--;
    }

    const starArray = Array(fullStars).fill('full');

    if (halfStar) {
      starArray.push('half');
    }

    starArray.push(...Array(emptyStars).fill('empty'));
    return starArray;
  }

  // Método para asignar el rating seleccionado por el usuario
  public setUserRating(star: number) {
    this.userRating = star;
  }

  onBack(): void {
    this._router.navigate(['/books']);
  }
}
