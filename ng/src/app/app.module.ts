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

import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { SystemService } from './services/system.service';

import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserAddComponent } from './user/user-add/user-add.component';

import { VendorService } from './services/vendor.service';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';

import { ProductService } from './services/product.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

import { PurchaseRequestService } from './services/purchase-request.service';
import { PurchaseRequestListComponent } from './purchase-request/purchase-request-list/purchase-request-list.component';
import { PurchaseRequestDetailComponent } from './purchase-request/purchase-request-detail/purchase-request-detail.component';
import { PurchaseRequestAddComponent } from './purchase-request/purchase-request-add/purchase-request-add.component';
import { PurchaseRequestEditComponent } from './purchase-request/purchase-request-edit/purchase-request-edit.component';
import { PurchaseRequestReviewComponent } from './purchase-request/purchase-request-review/purchase-request-review.component';

import { PurchaseRequestLineItemService } from './services/purchase-request-line-item.service';
import { PurchaseRequestLineItemListComponent } from './purchase-request-line-items/purchase-request-line-item-list/purchase-request-line-item-list.component';
import { PurchaseRequestLineItemReviewComponent } from './purchase-request-line-items/purchase-request-line-item-review/purchase-request-line-item-review.component';
import { PurchaseRequestLineItemEditComponent } from './purchase-request-line-items/purchase-request-line-item-edit/purchase-request-line-item-edit.component';
import { PurchaseRequestLineItemAddComponent } from './purchase-request-line-items/purchase-request-line-item-add/purchase-request-line-item-add.component';
import { PurchaseRequestLineItemDetailComponent } from './purchase-request-line-items/purchase-request-line-item-detail/purchase-request-line-item-detail.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent, AboutComponent, LoginComponent,

    UserListComponent, UserDetailComponent, UserEditComponent, UserAddComponent,
    
    VendorListComponent, VendorDetailComponent, VendorAddComponent, VendorEditComponent,
    
    ProductListComponent, ProductDetailComponent, ProductAddComponent, ProductEditComponent,

    PurchaseRequestListComponent, PurchaseRequestDetailComponent, PurchaseRequestAddComponent,
    PurchaseRequestEditComponent, PurchaseRequestReviewComponent,

    PurchaseRequestLineItemListComponent, PurchaseRequestLineItemReviewComponent,
    PurchaseRequestLineItemEditComponent, PurchaseRequestLineItemAddComponent,
    PurchaseRequestLineItemDetailComponent
  ],
  //The list of modules whose exported components, directives, or pipes are referenced by the 
  //component templates declared in this module.
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpModule],
  //Services go here, they are items that can be used be multiple components.
  providers: [UserService, VendorService, ProductService, PurchaseRequestService,
    PurchaseRequestLineItemService, SystemService],
  // The bootstrap components are the ones that get started automatically when the app starts
  bootstrap: [AppComponent]
})
export class AppModule { }
