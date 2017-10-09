// To start the app, use "ng serve -o" as a command line

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; //This refers specifically to the angular/core folder.

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
//^A class like these, with the "." in the address, refers to an item in the same folder as this file.

//In Angular, anything with @ is a decorator.  Unlike almost
//everything else, this does not end with a ";"
	//Decorator->Key->Component(s)
		//NgModule->declarations->AppComponent, MenuComponent
@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent, AboutComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
