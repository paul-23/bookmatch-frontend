import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent  implements OnInit{
  user: any;

  constructor(private _router: Router,private _route: ActivatedRoute,
    private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let id_user = this._route.snapshot.paramMap.get('id');
    this.bookService.getBookByID(id_user).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }

  getBase64ImageSrc(base64Image: string): SafeUrl {
    const imageUrl = `data:image/jpg;base64,${this.user.profile_image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  postBook(){

  }
}
