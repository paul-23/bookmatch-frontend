import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

import { TokenStorageService } from "../_services/token-storage.service";
import { Observable } from "rxjs";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.token.getToken();
    let authReq = req;
    if (token != null){
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
    return next.handle(authReq);
  }
}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]
