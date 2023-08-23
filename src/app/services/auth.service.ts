import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pluck } from 'rxjs';

const AUTH_BASE = 'https://bookmatch.onrender.com/auth/';
const BASE = 'https://bookmatch.onrender.com/api/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + 'signin', body, { headers });
  }

  signInUserId(email: string, password: string): Observable<string> {
    const body = {
      email: email,
      password: password,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + 'signin', body, { headers }).pipe(
      map((response) => response as any),
      pluck('id')
    );
  }

  signUp(userData: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<any>(AUTH_BASE + 'signup', userData, {
      headers: headers,
    });
  }

  updatePassword(id_user: number, oldPassword: string, newPassword: string) {
    const url = BASE + 'user/' + id_user + '/password';
    const params = new HttpParams()
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put<any>(url, null, { headers: headers, params: params });
  }
}
