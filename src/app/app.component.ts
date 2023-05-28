import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { BookService } from './rick-morty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookMatch';
  public input_text: string;
  user: any;
  userLogged: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private bookService: BookService, private router: Router) {
    this.input_text = '';
  }

}
