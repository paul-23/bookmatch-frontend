import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  user: any;
  userId: any;
  currentPassword: any = '';
  newPassword: any = '';
  confirmPassword: any = '';
  loading: boolean = true;
  profileImage: any;
  userLogged = false;

  passwordMatch: boolean = false;
  passwordNoMatch: boolean = false;
  passChangeOk: boolean = false;
  passChangeFail: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.getUserByID(this.user.id);
        this.userId = this.user.id;
      }
      if (!this.tokenStorageService.getToken()) {
        this.loading = false;
      }
    });
  }

  getUserByID(id: any) {
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser();
      this.bookService.getUserByID(id).subscribe(
        (response) => {
          this.user = response;
          this.profileImage = this.getBase64ImageSrc(this.user?.profile_image);
          this.loading = false;
        },
        () => {
          console.log('Error al cargar datos');
        }
      );
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.user.profile_image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  changePassword() {
    this.passwordNoMatch = false;
    if(this.newPassword == this.confirmPassword){
      this.passwordMatch = true;
      this.authService
      .updatePassword(this.userId, this.currentPassword, this.newPassword)
      .subscribe(
        (response) => {
          console.log('Password changed successfully', response);
          this.passChangeOk = true;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        (error) => {
          console.error('Error changing password', error);
          this.passChangeFail = true;
        }
      );
    } else {
      this.passwordNoMatch = true;
    }
  }
}
