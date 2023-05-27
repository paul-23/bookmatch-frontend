import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit{

  book: any;
  loading: boolean = true;

  constructor(private _router: Router,private _route: ActivatedRoute,private bookService: BookService, private sanitizer: DomSanitizer) { }

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

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.book.image_cover}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onBack(): void{
    this._router.navigate(['/books']);
  }
}
