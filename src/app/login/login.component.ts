import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { map, pluck } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput', { static: true })
  passwordInput!: ElementRef<HTMLInputElement>;
  showPassword!: boolean;
  email: string = '';
  password: string = '';
  userLogged: boolean = false;
  autenticationFailed: boolean = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorageService.getToken() != null){
      this.userLogged = true;
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  logIn():void{
    console.log(this.email + this.password);
    this.authService.signIn(this.email, this.password).subscribe(
      {
        next: (data: any) => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);
          this.userLogged = true;
          this.email = '';
          this.password = '';
        },
        error: (err: any) => {
          console.error('Error creating post', err);
          this.autenticationFailed = true;
        }
      }
    );
  }

  logout():void{
    this.tokenStorageService.signOut();
    this.userLogged = false;
  }
}
