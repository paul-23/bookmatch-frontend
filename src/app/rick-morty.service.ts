import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const BASE = "https://rickandmortyapi.com/api/";
const BASE = "http://localhost:8181/api/";
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
