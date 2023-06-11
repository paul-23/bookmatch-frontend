import { Component, OnInit } from "@angular/core";
import { BookService } from '../service.service';
import { Router } from "@angular/router";
import { TokenStorageService } from "../_services/token-storage.service";
import { Observable, Subscription } from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  userLogged: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private userService: BookService) {

  }

  ngOnInit(): void {
    this.userLogged = false;
    this.router.events.subscribe((event) => {
      this.getUser();
    });
  }

  getUser() {
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser();
      this.userService.getUserByID(this.user.id).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.log('Error al cargar datos');
        });
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/").then(() => {
      this.getUser();
    });
    this.router.navigate(["/home"]);
  }

}
