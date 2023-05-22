import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookMatch';
  public input_text: string;

  constructor() {
    this.input_text = '';
  }

  /*performSearch(){
    console.log(this.input_text);
  }*/

  /*sendInput() {
    var inputElement = document.getElementById("search_input") as HTMLInputElement;
    if (inputElement) {
      this.input_text = inputElement.value;
    }
  } */
}
