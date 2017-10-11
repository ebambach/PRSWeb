// To start the app, use "start ng serve -o" as a command line

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; //This refers specifically to the angular/core folder.
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

//Classes like these, with the "." in the address, refers to an item in the same folder as this file.
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { VendorComponent } from './vendor/vendor.component';
import { ProductComponent } from './product/product.component';
import { RequestComponent } from './request/request.component';
import { ReviewComponent } from './review/review.component';

//This is a service that can be used by multiple components, so it
//needs to be list below, in the providers
import {UserService} from './services/user.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserAddComponent } from './user/user-add/user-add.component';


//In Angular, anything with @ is a decorator.  Unlike almost
//everything else, this does not end with a ";"
	//Decorator->Key->Component(s)
		//NgModule->declarations->AppComponent, MenuComponent
@NgModule({
  //These declared classes are visible within the module but invisible to components in a different 
  //module unless they are exported from this module and the other module imports this one.
  declarations: [AppComponent, MenuComponent, HomeComponent, AboutComponent, UserComponent, LoginComponent, VendorComponent, ProductComponent, RequestComponent, ReviewComponent, UserListComponent, UserDetailComponent, UserEditComponent, UserAddComponent],
  //The list of modules whose exported components, directives, or pipes are referenced by the 
  //component templates declared in this module.
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpModule],
  //Services go here, they are items that can be used be multiple components.
  providers: [UserService],
  // The bootstrap components are the ones that get started automatically when the app starts
  bootstrap: [AppComponent]
})
export class AppModule { }
