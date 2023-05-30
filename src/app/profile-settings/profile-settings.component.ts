import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  selected: boolean = false;
  user_profile_image: any;

  passwordMatch: boolean = false;
  passwordNoMatch: boolean = false;
  passChangeOk: boolean = false;
  passChangeFail: boolean = false;

  previewImage: SafeUrl | null = null;
  typeFileError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.router.events.subscribe(() => {
      this.user = this.tokenStorageService.getUser();
      if (this.tokenStorageService.getUser()) {
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
          this.previewImage = this.addImagePrefix(this.user.profile_image);
          this.cdr.detectChanges();
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

  editProfile(){
    const formData = new FormData();

    const user2 = {
      username: this.user.username
    };

    formData.append('user', JSON.stringify(user2));

    if (this.user.profile_image) {
      formData.append('image',this.user.profile_image);
    }

    this.bookService.editUser(formData, this.user.id_user).subscribe(
      (response) => {
        this.toastr.success('Profile edited correctly');
        this.router.navigate(["/profile_settings"]);
      },
      (error) => {
        this.toastr.error('Error editing Profile');
        console.log('Error al cargar datos');
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.user.profile_image = file;
      this.selected = true;
      this.previewImage = this.addImagePrefix(file);
      this.cdr.detectChanges();
    } else {
      this.typeFileError = true;
    }
  }

  addImagePrefix(image: string | File): SafeUrl | null {
    if (image instanceof File) {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image));
    }

    if (image && !image.startsWith('data:image/')) {
      const extension = image.substr(0, 5) === '/9j/4' ? 'jpg' : 'png';
      return this.sanitizer.bypassSecurityTrustUrl('data:image/' + extension + ';base64,' + image);
    }

    return null;
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
