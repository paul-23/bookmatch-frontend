import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pluck, throwError } from 'rxjs';

//const BASE = "https://rickandmortyapi.com/api/";
const BASE = "https://api-bookmatch-production.up.railway.app/api/";
const AUTH_BASE = "https://api-bookmatch-production.up.railway.app/auth/"
const NUM_BOOKS = 8;

@Injectable({
  providedIn: 'root'
})
export class BookService {

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

  updateBookAvailability(id: number) {
    return this.http.put(BASE + "book/" + id + "/available", null);
  }

  updateBookNOTAvailability(id: number) {
    return this.http.put(BASE + "book/" + id + "/notavailable", null);
  }

  getBooks() {
    return this.http.get(BASE + "books");
    //+  getRndom().join());
  }

  getBooksPagination(page: number, size: number): Observable<any> {
    return this.http.get(BASE + "listbooks?page=" + page + "&size=" + size);
  }

  getBooksByUserID(id_user: any) {
    return this.http.get(BASE + "books/user/" + id_user);
  }

  deleteBookByID(id: any): Observable<any> {
    return this.http.delete(BASE + "book/" + id).pipe(
      catchError((error) => {
        console.log('Error al eliminar el libro', error);
        return throwError('Error al eliminar el libro');
      })
    );
  }

  getEditorials() {
    return this.http.get(BASE + "editorials");
    //+  getRndom().join());
  }

  getEditorialByName(name: any) {
    return this.http.get(BASE + "editorial/name/" + name);
  }

  getUserByID(id: any) {
    return this.http.get(BASE + "user/" + id);
  }


  getBookByID(id: any){
    return this.http.get(BASE+"book/"+id);

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

  getEditorialByTitle(title: any){
    return this.http.get(BASE + "editorial/name/" + title)
  }

  getAverageRatingByBookId(id: any){
    return this.http.get(BASE+"ratings/average/"+id);
  }

  getRatingsByBookId(id: any){
    return this.http.get(BASE+"ratings/"+id);
  }

  editUser(user: any, id: any) : Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(BASE+"user/"+id, user);
  }

  createBook(bookData: any) {

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<any>(BASE + "book", bookData, { headers: headers });

  }

  updateBook(formData: FormData, id: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put<any>(BASE + "book/" + id, formData, { headers: headers });
  }


  createRating(ratingData: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>(BASE + "ratings", ratingData)
  }





  editRating(ratingData: any, id: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<any>(BASE + "ratings/" + id, ratingData)
  }




  createEditorial(name_editorial: string): Observable<any> {

    const body = {
      name_editorial
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');


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
