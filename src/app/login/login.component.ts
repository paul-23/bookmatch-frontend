import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { map, pluck } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

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
  logiiin: any;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if(this.tokenStorageService.getToken() != null){
      this.userLogged = true;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordElement = document.getElementById('password') as HTMLInputElement;
    if (passwordElement) {
      passwordElement.type = this.showPassword ? 'text' : 'password';
    }
  }

  logIn(loginForm: NgForm):void{
    if (loginForm.invalid) {
      this.toastr.error('Enter your email and password', 'Failed to login');
      this.submitted = true;
      return;
    }
    this.authService.signIn(this.email, this.password).subscribe(
      {
        next: (data: any) => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);
          this.userLogged = true;
          this.email = '';
          this.password = '';
          const user = this.tokenStorageService.getUser();
          this.toastr.success('Login successful', 'Welcome back ' + user.username);
          this.router.navigate(["/"]);
        },
        error: (err: any) => {
          this.toastr.error('Wrong email or password', 'Failed to login');
          this.autenticationFailed = true;
        }
      }
    );
  }

  logout():void{
    this.tokenStorageService.signOut();
    this.userLogged = false;
    this.router.navigate(["/login"]);
  }
}
