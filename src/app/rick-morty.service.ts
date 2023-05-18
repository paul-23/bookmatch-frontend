import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const BASE = "https://rickandmortyapi.com/api/";
const BASE = "localhost:8181/api/";
const NUM_BOOKS = 8;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  get8RndomBooks(){
    return this.http.get(BASE+"book/"+
      getRndom().join());
  }

  getBookByID(id: any){
    return this.http.get(BASE+"book/"+id);
  }

  getBookByName(title: any){
    return this.http.get(BASE+"book/title/"+title);
  }

  getBookCover(id: any){
    return this.http.get(BASE+"book/image/" + id)
  }

}

function getRndom(){
  let randoms = [];
  for(let i=0;i<NUM_BOOKS;i++){
    randoms.push(Math.floor(Math.random() * 5 + 1))
  }
  return randoms;
}


