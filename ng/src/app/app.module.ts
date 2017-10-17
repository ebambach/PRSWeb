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
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';

//These are services that can be used by multiple components, so they
//needs to be listed below, in the providers
import {UserService} from './services/user.service';
import {VendorService} from './services/vendor.service';
import {ProductService} from './services/product.service';
import {PurchaseRequestService} from './services/purchase-request.service';
import {PurchaseRequestLineItemService} from './services/purchase-request-line-item.service';
import {SystemService} from './services/system.service';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserAddComponent } from './user/user-add/user-add.component';

import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';

import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';

import { PurchaseRequestAddComponent } from './purchase-request/purchase-request-add/purchase-request-add.component';
import { PurchaseRequestDetailComponent } from './purchase-request/purchase-request-detail/purchase-request-detail.component';
import { PurchaseRequestEditComponent } from './purchase-request/purchase-request-edit/purchase-request-edit.component';
import { PurchaseRequestReviewComponent } from './purchase-request/purchase-request-review/purchase-request-review.component';
import { PurchaseRequestListComponent } from './purchase-request/purchase-request-list/purchase-request-list.component';

import { PurchaseRequestLineItemAddComponent } from './purchase-request-line-items/purchase-request-line-item-add/purchase-request-line-item-add.component';
import { PurchaseRequestLineItemListComponent } from './purchase-request-line-items/purchase-request-line-item-list/purchase-request-line-item-list.component';
import { PurchaseRequestLineItemEditComponent } from './purchase-request-line-items/purchase-request-line-item-edit/purchase-request-line-item-edit.component';
import { PurchaseRequestLineItemReviewComponent } from './purchase-request-line-items/purchase-request-line-item-review/purchase-request-line-item-review.component';

//In Angular, anything with @ is a decorator.  Unlike almost
//everything else, this does not end with a ";"
	//Decorator->Key->Component(s)
		//NgModule->declarations->AppComponent, MenuComponent
@NgModule({
  //These declared classes are visible within the module but invisible to components in a different 
  //module unless they are exported from this module and the other module imports this one.
  declarations: [AppComponent, MenuComponent, HomeComponent, AboutComponent, UserComponent, LoginComponent, VendorComponent, 
  ProductComponent, PurchaseRequestComponent,

  UserListComponent, UserDetailComponent, UserEditComponent, UserAddComponent, 

  VendorListComponent, VendorEditComponent, VendorDetailComponent, VendorAddComponent, 

  ProductAddComponent, ProductDetailComponent, ProductEditComponent, ProductListComponent,

  PurchaseRequestAddComponent, PurchaseRequestDetailComponent, PurchaseRequestEditComponent, 
  PurchaseRequestReviewComponent,  PurchaseRequestListComponent,
  
  PurchaseRequestLineItemListComponent, PurchaseRequestLineItemAddComponent,
  PurchaseRequestLineItemEditComponent, PurchaseRequestLineItemReviewComponent],
  //The list of modules whose exported components, directives, or pipes are referenced by the 
  //component templates declared in this module.
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpModule],
  //Services go here, they are items that can be used be multiple components.
  providers: [UserService, VendorService, ProductService, PurchaseRequestService, PurchaseRequestLineItemService, 
  SystemService],
  // The bootstrap components are the ones that get started automatically when the app starts
  bootstrap: [AppComponent]
})
export class AppModule { }
