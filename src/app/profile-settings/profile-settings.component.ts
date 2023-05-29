import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: any;
  currentPassword: any = '';
  newPassword: any = '';
  confirmPassword: any = '';
  loading: boolean = true;
  profileImage: any;
  userLogged = false;
  selected: boolean = false;
  user_profile_image: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.user = this.tokenStorageService.getUser();
      if (this.tokenStorageService.getUser()) {

        console.log(this.tokenStorageService.getUser());
        this.getUserByID(this.user.id);
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

  editProfile(){
    const formData = new FormData();

    const user2 = {
      username: this.user.username
    };

    formData.append('user', JSON.stringify(user2));

    if (this.selected) {
      formData.append('image',this.user_profile_image);
    }else{
      console.log(this.user.profile_image);
      formData.append('image',this.user.profile_image);
    }

    //formData.append('image',this.user.profile_image);

    this.bookService.editUser(formData, this.user.id_user).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  onFileSelected(event: any) {
    this.user_profile_image = event.target.files[0];
    this.selected = true;
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.user.profile_image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
