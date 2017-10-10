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

const routes: Routes = [
	//Redirects to home if blank
	{path:"", redirectTo:"/Home,", pathMatch:"full"},
	{path:"Home", component:HomeComponent},
	{path:"About", component:AboutComponent},
	{path:"Login", component:LoginComponent},
	{path:"User", component:UserComponent},
	{path:"Product", component:ProductComponent},
	{path:"Request", component:RequestComponent},
	{path:"Review", component:ReviewComponent},
	{path:"Vendor", component:VendorComponent}
];
//Because the NgModule needs to now about the routing, this gets
//exported to the NgModule, as it's class name, AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
