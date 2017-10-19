import { Component } from '@angular/core';

@Component({
  //The selector, "app-root," will be used as a pseudo html tag to
  //determine where the items go in the index.html
  selector: 'app-root',
  
  //Where the html file is, so we can use it to add our items
  templateUrl: './app.component.html',
  
  //If we want to use a small amount of text, we can use
  //template:'<h1>Etiam porta sem malesuada magna mollis euismod.</h1>',
  //to insert text.
  //Where the styles are stored
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Last Page on the Internet';
  scriptingLanguage = "Typescript";
}
