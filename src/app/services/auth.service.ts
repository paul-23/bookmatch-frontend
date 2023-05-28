import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pluck } from 'rxjs';

const AUTH_BASE = "https://api-bookmatch-production.up.railway.app/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + "signin", body, { headers });
  }

  signInUserId(email: string, password: string): Observable<string> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + "signin", body, { headers }).pipe(
      map(response => response as any),
      pluck('id')
    );
  }


}
