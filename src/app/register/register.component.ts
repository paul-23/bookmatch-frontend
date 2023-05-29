import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('passwordInput', { static: true })
  passwordInput!: ElementRef<HTMLInputElement>;
  showPassword!: boolean;
  showRepeatPassword!: boolean;

  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordAgain: string = '';
  checkBox: boolean = false;

  passwordMatch: boolean = true;
  isChecked: boolean = true;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private appcomponent: AppComponent) { }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  toggleRepeatPasswordVisibility(passwordInput: HTMLInputElement) {
    this.showRepeatPassword = !this.showRepeatPassword;
    passwordInput.type = this.showRepeatPassword ? 'text' : 'password';
  }

  register() {
    if (this.password == this.passwordAgain) {
      if (this.checkBox) {
        this.isChecked = true;
        this.passwordMatch = true;
        const formData = new FormData();
        const user = {
          username: this.fullName,
          email: this.email,
          password: this.password
        };
        formData.append('signup', JSON.stringify(user));
        this.authService.signUp(formData);
        this.logIn();
        this.fullName = '';
        this.email = '';
        this.password = '';
        this.passwordAgain = '';
        this.checkBox = false;

      } else {
        this.isChecked = false;
      }
    } else {
      this.passwordMatch = false;
    }
  }

  logIn():void{

    this.authService.signIn(this.email, this.password).subscribe(
      {
        next: (data: any) => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);
          this.email = '';
          this.password = '';
          this.router.navigate(["/"]);
        },
        error: (err: any) => {
          console.error('Error creating post', err);
        }
      }
    );
  }

}
