import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit{

  user: any;
  books: any;

  constructor(private _router: Router,private _route: ActivatedRoute,
    private bookService: BookService, private sanitizer: DomSanitizer) {
      this.books = [
        { title: 'Book 1', author: 'author 1', available: true },
        { title: 'Book 2', author: 'author 1', available: false },
        { title: 'Book 3', author: 'author 1', available: true }
      ]
    }

  ngOnInit(): void {
    let id_user = this._route.snapshot.paramMap.get('id');
    this.bookService.getUserByID(id_user).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.user.profile_image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onBack(): void{
    this._router.navigate(['/home']);
  }
}
