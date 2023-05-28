import { Component, OnInit } from "@angular/core";
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

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser().username;
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    });
  }

}
