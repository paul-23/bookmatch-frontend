import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { BookService } from './rick-morty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookMatch';
  public input_text: string;
  user: any;
  userLogged: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private bookService: BookService, private router: Router) {
    this.input_text = '';
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;
    if (this.user !== undefined) {
      this.userLogged = true;
      console.log(this.user);
    }
  }

  refreshPage() {
    this.router.navigate(['home']);
    window.location.reload();
  }

  /*performSearch(){
    console.log(this.input_text);
  }*/

  /*sendInput() {
    var inputElement = document.getElementById("search_input") as HTMLInputElement;
    if (inputElement) {
      this.input_text = inputElement.value;
    }
  } */
}
