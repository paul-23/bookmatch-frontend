import { Injectable } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }
    return {};
  }

  public getUserName(): any{
    return window.sessionStorage.getItem(USER_KEY);
  }
}
