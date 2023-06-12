import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput', { static: true })
  passwordInput!: ElementRef<HTMLInputElement>;
  showPassword!: boolean;
  showRepeatPassword!: boolean;
  profile_image: any;
  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordAgain: string = '';
  checkBox: boolean = false;
  userLogged: boolean = false;
  passwordMatch: boolean = true;
  isChecked: boolean = true;
  submitted: boolean = false;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if(this.tokenStorageService.getToken() != null){
      this.userLogged = true;
    }
  }

  togglePasswordVisibility(passwordInput: NgModel) {
    this.showPassword = !this.showPassword;
    const passwordElement = document.getElementById('password') as HTMLInputElement;
    if (passwordElement) {
      passwordElement.type = this.showPassword ? 'text' : 'password';
    }
  }

  toggleRepeatPasswordVisibility(passwordInput: NgModel) {
    this.showRepeatPassword = !this.showRepeatPassword;
    const repeatPasswordElement = document.getElementById('repeatPassword') as HTMLInputElement;
    if (repeatPasswordElement) {
      repeatPasswordElement.type = this.showRepeatPassword ? 'text' : 'password';
    }
  }

  checkPasswordMismatch(): boolean {
    return this.password !== this.passwordAgain;
  }

  register(registerForm: NgForm): void {
    if (registerForm.invalid) {
      this.toastr.error('Error creating user');
      this.submitted = true;
      return;
    }
    this.submitted = true;
    if (this.password === this.passwordAgain) {
      if (this.checkBox) {
        this.isChecked = true;
        const formData = new FormData();
        const user = {
          username: this.fullName,
          email: this.email,
          password: this.password
        };

        formData.append('signup', JSON.stringify(user));
        formData.append('image', this.profile_image);
        this.authService.signUp(formData).subscribe(
          (response) => {
            console.log('User registered successfully', response);
            this.logIn();
             // Handle success
          },
          (error) => {
            console.error('Error creating user', error);
            this.toastr.error('Email already exists!');
             // Handle error
          }
        );

      } else {
        this.isChecked = false;
      }
    } else {
      this.isChecked = true;
      this.passwordAgain = '';
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
          const user = this.tokenStorageService.getUser();
          this.toastr.success('Welcome to BookMatch, ' + user.username);
          this.router.navigate(["/"]);
        },
        error: (err: any) => {
          console.error('Error creating post', err);
        }
      }
    );
  }

  onFileChange(event: any) {
    this.profile_image = event.target.files[0];
  }

  logout():void{
    this.tokenStorageService.signOut();
    this.userLogged = false;
    this.router.navigate(["/register"]);
  }

}
