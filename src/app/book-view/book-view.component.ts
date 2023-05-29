import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';


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
  total_rating: any;
  user_ratings: any;
  id_book: any;


  constructor(private _router: Router, private _route: ActivatedRoute, private bookService: BookService,
    private sanitizer: DomSanitizer, private tokenStorageService: TokenStorageService, private http: HttpClient,
    private location: Location) { }

  ngOnInit(): void {
    this.id_book = this._route.snapshot.paramMap.get('id');
    this.loadRndomBooksDelayed();
    //this._router.events.subscribe(() => {
      this.loadRatings();
    //});
  }

  loadRndomBooksDelayed() {
    setTimeout(() => {
      this.loadBook();
    }, 1000);
  }

  postRating(){
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
    console.log(this.tokenStorageService.getUser());




    formData.append('rating', JSON.stringify(rating));

    this.bookService.createRating(rating).subscribe(
      (response: any) => {
        console.log('Rating created successfully', response);
        this.loadRatings();
         // Handle success
      },
      (error: any) => {
      window.alert('You have already given a rating to this book');

        //this.bookService.editRating(rating, rating.id_rating).subscribe(
        //  (response: any) => {
        //    console.log('Rating edited successfully', response);
        //    this.loadRatings();
        //    // Handle success
        //  },
        //  (error: any) => {


        //  window.alert('You have already given a rating to this book');        // Handle error
        //  }
        //);       // Handle error
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

  loadRatings(){
    this.bookService.getAverageRatingByBookId(this.id_book).subscribe(
      (response) => {
        console.log('Ratings cargados');
        this.total_rating = response;
        console.log(this.total_rating);
      },
      (error) => {
        console.log('Error al cargar datos');
        this.loading = false;
      }
    );


    this.bookService.getRatingsByBookId(this.id_book).subscribe(
      (response) => {
        console.log('Ratings cargados');
        this.user_ratings = response;
        console.log(this.user_ratings);
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
