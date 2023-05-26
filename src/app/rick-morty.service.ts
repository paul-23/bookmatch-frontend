import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pluck } from 'rxjs';

//const BASE = "https://rickandmortyapi.com/api/";
//const BASE = "http://localhost:8181/api/";
const BASE = "https://api-bookmatch-production.up.railway.app/api/";
const AUTH_BASE = "https://api-bookmatch-production.up.railway.app/auth/"
const NUM_BOOKS = 8;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<string> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + "signin", body, { headers }).pipe(
      map(response => response as any), // Transforma la respuesta a tipo 'any'
      pluck('accessToken') // Obtiene el valor de la propiedad 'accessToken'
    );

    // return this.http.post(AUTH_BASE + "signin", body, { headers }).pipe(map(response => {
    //   const accessToken = response.accessToken;
    //   sessionStorage.setItem('accessToken', accessToken);
    // }));

  }

  /* signIn(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(AUTH_BASE + "signin", body, { headers }).pipe(map(response => {
      const accessToken = response;
      sessionStorage.setItem('accessToken', accessToken.accessToken);
      return response; // Devuelve la respuesta para que pueda ser observada
    }));
  } */

  getBooks() {
    return this.http.get(BASE + "books");
    //+  getRndom().join());
  }

  getEditorials() {
    return this.http.get(BASE + "editorials");
    //+  getRndom().join());
  }

  getUserByID(id: any) {
    return this.http.get(BASE + "user/" + id);
  }

  getBookByID(id: any) {
    return this.http.get(BASE + "book/" + id);
  }

  getBookByName(title: any) {
    return this.http.get(BASE + "book/title/" + title);
  }

  getBookByAuthor(author: any) {
    return this.http.get(BASE + "book/author/" + author);
  }

  getBookByISBN(isbn: any) {
    return this.http.get(BASE + "book/isbn/" + isbn);
  }

  getBookCover(id: any) {
    return this.http.get(BASE + "book/image/" + id)
  }

  getBookByTitle(title: any) {
    return this.http.get(BASE + "book/title/" + title)
  }

  createEditorial(editorial_name: string): Observable<any> {
    const body = {
      editorial_name: editorial_name
      //editorial_name
    };
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(BASE + "editorials", body, { headers });
  }

  getHeader(adminToken: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${adminToken}`);
    return headers;
  }
}

function getRndom() {
  let randoms = [];
  for (let i = 0; i < NUM_BOOKS; i++) {
    randoms.push(Math.floor(Math.random() * 5 + 1))
  }
  return randoms;
}



function createBook(cover_image: any, author: any, title: any, isbn: any, category: any, name_editorial: any) {

}
