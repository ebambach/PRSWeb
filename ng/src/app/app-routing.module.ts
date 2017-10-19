import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

import { PurchaseRequestListComponent } from './purchase-request/purchase-request-list/purchase-request-list.component';
import { PurchaseRequestDetailComponent } from './purchase-request/purchase-request-detail/purchase-request-detail.component';
import { PurchaseRequestAddComponent } from './purchase-request/purchase-request-add/purchase-request-add.component';
import { PurchaseRequestEditComponent } from './purchase-request/purchase-request-edit/purchase-request-edit.component';

import { PurchaseRequestLineItemListComponent } from './purchase-request-line-items/purchase-request-line-item-list/purchase-request-line-item-list.component';
import { PurchaseRequestLineItemDetailComponent } from './purchase-request-line-items/purchase-request-line-item-detail/purchase-request-line-item-detail.component';
import { PurchaseRequestLineItemEditComponent } from './purchase-request-line-items/purchase-request-line-item-edit/purchase-request-line-item-edit.component';
import { PurchaseRequestLineItemAddComponent } from './purchase-request-line-items/purchase-request-line-item-add/purchase-request-line-item-add.component';
import { PurchaseRequestLineItemReviewComponent } from './purchase-request-line-items/purchase-request-line-item-review/purchase-request-line-item-review.component';


const routes: Routes = [
	//In the event that this field is blank, we redirect the user to the home page
	{path:"", redirectTo:"/home", pathMatch:"full"},
	{ path: "home", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "about", component: AboutComponent },

	{ path: "users", component: UserListComponent },
	{ path: "users/detail/:id", component: UserDetailComponent },	
	{ path: "users/add", component: UserAddComponent },
	{ path: "users/edit/:id", component: UserEditComponent },

	{ path: "vendors", component: VendorListComponent },
	{ path: "vendors/detail/:id", component: VendorDetailComponent },	
	{ path: "vendors/add", component: VendorAddComponent },
	{ path: "vendors/edit/:id", component: VendorEditComponent },

	{ path: "products", component: ProductListComponent },
	{ path: "products/detail/:id", component: ProductDetailComponent },	
	{ path: "products/add", component: ProductAddComponent },
	{ path: "products/edit/:id", component: ProductEditComponent },

	{ path: "purchaseRequests", component: PurchaseRequestListComponent },
	{ path: "purchaseRequests/detail/:id", component: PurchaseRequestDetailComponent },	
	{ path: "purchaseRequests/add", component: PurchaseRequestAddComponent },
	{ path: "purchaseRequests/edit/:id", component: PurchaseRequestEditComponent },

	{ path: "purchaseRequestLineItems/:id", component: PurchaseRequestLineItemListComponent },
	{ path: "purchaseRequestLineItems/add/:id", component: PurchaseRequestLineItemAddComponent },
	{ path: "purchaseRequestLineItems/detail/:id", component: PurchaseRequestLineItemDetailComponent },
	{ path: "purchaseRequestLineItems/edit/:id", component: PurchaseRequestLineItemEditComponent },
	{ path: "purchaseRequestLineItemReview/:id", component: PurchaseRequestLineItemReviewComponent }
		
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
