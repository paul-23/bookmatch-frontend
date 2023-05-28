import { Component, ElementRef, ViewChild } from '@angular/core';

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

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  toggleRepeatPasswordVisibility(passwordInput: HTMLInputElement) {
    this.showRepeatPassword = !this.showRepeatPassword;
    passwordInput.type = this.showRepeatPassword ? 'text' : 'password';
  }

}
