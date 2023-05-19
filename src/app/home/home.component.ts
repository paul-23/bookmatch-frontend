import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../rick-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  title = "";

  books: any;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.title = this.getMessage();
    this.loadRndomBooks();
  }

  getMessage() {

    var num = Math.floor(Math.random() * 9);
    var r_text = new Array (9);
    r_text[0] = "Comparte tus historias, regala aventuras. ¡Haz que tus libros cobren vida en manos de otros amantes de la lectura!";
    r_text[1] = "Compartir libros es abrir puertas a nuevos mundos. Únete a nuestra comunidad de intercambio y difunde el placer de la lectura.";
    r_text[2] = "Compartir libros es multiplicar el conocimiento y la pasión. Únete a nosotros y deja que tus libros inspiren a otros lectores.";
    r_text[3] = "Comparte el amor por la lectura, pasa tus libros a nuevos dueños y deja que las historias sigan viajando.";
    r_text[4] = "Tu libro favorito puede ser el tesoro de alguien más. Ayúdanos a construir una comunidad de intercambio de libros y deja que tus tesoros literarios encuentren nuevos hogares.";
    r_text[5] = "Comparte una página, inspira a alguien más. Únete a nuestra app de intercambio de libros y conviértete en un embajador de la lectura solidaria.";
    r_text[6] = "El poder de un libro compartido es ilimitado. Únete a nuestra comunidad y descubre la alegría de ver tus libros tocar las vidas de otros lectores.";
    r_text[7] = "Compartir libros es alimentar la imaginación colectiva. Únete a nosotros y sé parte del ciclo de la literatura, donde cada libro es un viajero incansable.";
    r_text[8] = "Comparte tus libros y construye conexiones literarias duraderas. Juntos, creamos un mundo donde las palabras nunca dejan de fluir.";
    r_text[9] = "La magia de un libro se multiplica cuando lo compartes. Únete a nuestra comunidad de intercambio y déjate sorprender por las historias que llegarán a tus manos.";
    return r_text[num];
  }

  getRndom() {
    return Math.floor(Math.random() * 5 + 1);
  }

  loadRndomBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response;
        console.log(this.books);
      },
      (error) => {
        console.log('Error al cargar datos');
      }
    );
  }
}
