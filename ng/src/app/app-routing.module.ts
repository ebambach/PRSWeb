import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { RequestComponent } from './request/request.component';
import { ReviewComponent } from './review/review.component';
import { VendorComponent } from './vendor/vendor.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserAddComponent} from './user/user-add/user-add.component';
import {VendorListComponent} from './vendor/vendor-list/vendor-list.component';
import {VendorDetailComponent} from './vendor/vendor-detail/vendor-detail.component';

const routes: Routes = [
	//Redirects to home if blank
	{path:"", redirectTo:"/Home,", pathMatch:"full"},
	{path:"Home", component:HomeComponent},
	{path:"About", component:AboutComponent},
	{path:"Login", component:LoginComponent},
	{path:"Users", component:UserListComponent},
	{path:"Users/Detail/:id", component:UserDetailComponent},
	{path:"Users/Edit/:id", component:UserEditComponent},
	{path:"Users/Add", component:UserAddComponent},
	{path:"Products", component:ProductComponent},
	{path:"Requests", component:RequestComponent},
	{path:"Reviews", component:ReviewComponent},
	{path:"Vendors", component:VendorListComponent},
	{path:"Vendors/Detail/:id", component:VendorDetailComponent}
];
//Because the NgModule needs to now about the routing, this gets
//exported to the NgModule, as it's class name, AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
