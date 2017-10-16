import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { VendorComponent } from './vendor/vendor.component';

import {UserListComponent} from './user/user-list/user-list.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserAddComponent} from './user/user-add/user-add.component';

import {VendorListComponent} from './vendor/vendor-list/vendor-list.component';
import {VendorDetailComponent} from './vendor/vendor-detail/vendor-detail.component';
import {VendorEditComponent} from './vendor/vendor-edit/vendor-edit.component';
import {VendorAddComponent} from './vendor/vendor-add/vendor-add.component';

import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {ProductAddComponent} from './product/product-add/product-add.component';

import {PurchaseRequestListComponent} from './purchase-request/purchase-request-list/purchase-request-list.component';
import {PurchaseRequestDetailComponent} from './purchase-request/purchase-request-detail/purchase-request-detail.component';
import {PurchaseRequestEditComponent} from './purchase-request/purchase-request-edit/purchase-request-edit.component';
import {PurchaseRequestAddComponent} from './purchase-request/purchase-request-add/purchase-request-add.component';

const routes: Routes = [
	//Redirects to home if blank
	{path:"", redirectTo:"/Home", pathMatch:"full"},
	{path:"Home", component:HomeComponent},
	{path:"About", component:AboutComponent},
	{path:"Login", component:LoginComponent},
	
	{path:"Users", component:UserListComponent},
	{path:"Users/Detail/:id", component:UserDetailComponent},
	{path:"Users/Edit/:id", component:UserEditComponent},
	{path:"Users/Add", component:UserAddComponent},	
	
	{path:"Vendors", component:VendorListComponent},
	{path:"Vendors/Detail/:id", component:VendorDetailComponent},
	{path:"Vendors/Edit/:id", component:VendorEditComponent},
	{path:"Vendors/Add", component:VendorAddComponent},

	{path:"Products", component:ProductListComponent},
	{path:"Products/Detail/:id", component:ProductDetailComponent},
	{path:"Products/Edit/:id", component:ProductEditComponent},
	{path:"Products/Add", component:ProductAddComponent},

	{path:"Requests", component:PurchaseRequestListComponent},
	{path:"Requests/Detail/:id", component:PurchaseRequestDetailComponent},
	{path:"Requests/Edit/:id", component:PurchaseRequestEditComponent},
	{path:"Requests/Add", component:PurchaseRequestAddComponent}
];
//Because the NgModule needs to now about the routing, this gets
//exported to the NgModule, as it's class name, AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
