import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { BookService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';

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
  deleteProfileImg: boolean = false;

  submittedProfile: boolean = false;
  submittedPassword: boolean = false;

  showCurrentPassword: boolean = false;
  showNewtPassword: boolean = false;
  showConfirmtPassword: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = this.tokenStorageService.getUser();
    if (this.tokenStorageService.getUser()) {
      this.getUserByID(this.user.id);
      this.userId = this.user.id;
    }
    if (!this.tokenStorageService.getToken()) {
      this.loading = false;
    }
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

  editProfile(userForm: NgForm) {

    if (userForm.invalid) {
      this.toastr.error('There are empty or incorrect fields', 'Error updating profile');
      this.submittedProfile = true;
      return;
    }

    const formData = new FormData();

    const user2 = {
      username: this.user.username
    };

    formData.append('user', JSON.stringify(user2));

    if (!this.deleteProfileImg) {
      formData.append('image', this.user.profile_image);
    } else {
      formData.append('deleteImage', 'true');
    }

    this.bookService.editUser(formData, this.user.id_user).subscribe(
      (response) => {
        this.toastr.success('Profile edited correctly');
        this.getUserByID(this.userId);
        this.router.navigate(['/profile_settings']);
      },
      (error) => {
        this.toastr.error('Error editing Profile');
        console.log('Error al cargar datos');
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.size > 16 * 1024 * 1024) {
      this.toastr.error('Error adding image', 'The image cannot exceed 16mb');
      this.user.profile_image = null;
      return;
    }
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

  toggleCurrentPasswordVisibility(passwordInput: NgModel) {
    this.showCurrentPassword = !this.showCurrentPassword;
    const passwordElement = document.getElementById('currentPassword') as HTMLInputElement;
    if (passwordElement) {
      passwordElement.type = this.showCurrentPassword ? 'text' : 'password';
    }
  }

  toggleNewPasswordVisibility(passwordInput: NgModel) {
    this.showNewtPassword = !this.showNewtPassword;
    const newPasswordElement = document.getElementById('new-password') as HTMLInputElement;
    if (newPasswordElement) {
      newPasswordElement.type = this.showNewtPassword ? 'text' : 'password';
    }
  }

  toggleConfirmPasswordVisibility(passwordInput: NgModel) {
    this.showConfirmtPassword = !this.showConfirmtPassword;
    const confirmPasswordElement = document.getElementById('confirm-password') as HTMLInputElement;
    if (confirmPasswordElement) {
      confirmPasswordElement.type = this.showConfirmtPassword ? 'text' : 'password';
    }
  }

  changePassword(passwordForm: NgForm) {

    if (passwordForm.invalid) {
      this.toastr.error('Error, there are empty or incorrect fields');
      this.submittedPassword = true;
      return;
    }

    this.passwordNoMatch = false;
    if (this.newPassword == this.confirmPassword) {
      this.passwordMatch = true;
      this.authService
        .updatePassword(this.userId, this.currentPassword, this.newPassword)
        .subscribe(
          (response) => {
            console.log('Password changed successfully', response);
            this.toastr.success('Password changed successfully');
            this.passChangeOk = true;
            passwordForm.resetForm();
            passwordForm.reset();
            this.submittedPassword = false;
          },
          (error) => {
            this.toastr.error('Password does not match your current password');
            console.error('Error changing password', error);
            this.passChangeFail = true;
          }
        );
    } else {
      this.passwordNoMatch = true;
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKeydown(event: KeyboardEvent) {
    setTimeout(() => {
      event.preventDefault();
      const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement;
      activeElement.blur();
    }, 1);
  }

  deleteProfileImage() {
    this.user.profile_image = null;
    this.previewImage = null;
    this.deleteProfileImg = true;
  }

}
