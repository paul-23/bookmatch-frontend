import { Component, ElementRef, ViewChild } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('passwordInput', { static: true })
  passwordInput!: ElementRef<HTMLInputElement>;
  showPassword!: boolean;
  token: string = '';
  email: string = '';
  password: string = '';

  constructor(private bookService: BookService, private tokenStorageService: TokenStorageService) {}

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  /*ngOnInit() {
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTY4NTAxMjAxOSwiZXhwIjoxNjg1MDk4NDE5fQ.eMfykDQnrPRir01GdDfFcyirgIVNG_9M8cD8hORWBYJ7n6HYefPDAhvIxWJqXffU1dik15qAvO_bQr6af9z2Ow";

    sessionStorage.setItem('token', token);
    this.tokenStorageService.saveToken(token);
  }*/

  logIn():void{
    console.log(this.email + this.password);
    this.bookService.signIn(this.email, this.password).subscribe(
      response => {

        this.token = response;
        console.log(this.token);
        // Handle the response or perform additional actions
      },
      error => {
        console.error('Error creating post', error);

        // Handle the error appropriately
      }
    );
  }
}


