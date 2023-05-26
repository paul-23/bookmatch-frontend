import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const BASE = "https://rickandmortyapi.com/api/";
//const BASE = "http://localhost:8181/api/";
const BASE = "https://api-bookmatch-production.up.railway.app/api/";
const NUM_BOOKS = 8;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(BASE+"books");
    //+  getRndom().join());
  }

  getEditorials(){
    return this.http.get(BASE+"editorials");
    //+  getRndom().join());
  }

  getUserByID(id: any){
    return this.http.get(BASE+"user/"+id);
  }

  getBookByID(id: any){
    return this.http.get(BASE+"book/"+id);
  }

  getBookByName(title: any){
    return this.http.get(BASE+"book/title/"+title);
  }

  getBookByAuthor(author: any){
    return this.http.get(BASE+"book/author/"+author);
  }

  getBookByISBN(isbn: any){
    return this.http.get(BASE+"book/isbn/"+isbn);
  }

  getBookCover(id: any){
    return this.http.get(BASE+"book/image/" + id)
  }

  getBookByTitle(title: any){
    return this.http.get(BASE+"book/title/" + title)
  }

  createBook(title: string, author: string, isbn: string, category: string, image: any, editorial: any): Observable<any> {

    const body = {
      title,
      author,
      isbn,
      category,
      image,
      editorial
    };

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<any>(BASE + "book", body, { headers });
  }


  createEditorial(name_editorial: string): Observable<any> {

    const body = {
      name_editorial
    };

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<any>(BASE + "editorials", body, { headers });
  }

  getHeader(adminToken: any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${adminToken}`);
    return headers;
  }
}

function getRndom(){
  let randoms = [];
  for(let i=0;i<NUM_BOOKS;i++){
    randoms.push(Math.floor(Math.random() * 5 + 1))
  }
  return randoms;
}



function createBook(cover_image: any, author: any, title: any, isbn: any, category: any, name_editorial: any){

}
