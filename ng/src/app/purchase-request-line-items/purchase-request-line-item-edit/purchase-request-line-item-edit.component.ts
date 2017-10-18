import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestService} from '../../services/purchase-request.service';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {
	loggedInUser: User;
	products: Product[];
	purchaserequest: PurchaseRequest;

	purchaseRequestLineItem: PurchaseRequestLineItem; 

	update() {
		this.PurchaseRequestLineItemSvc.change(this.purchaseRequestLineItem).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/Requests/'+ this.purchaserequest.Id + '/LineItems']) 
			}
		)
	}	

	getProducts(): void {
		this.ProductSvc.list()
			.then(resp => this.products = resp);
	}

  constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
  			private route: ActivatedRoute, private router: Router, private ProductSvc: ProductService,
  			private PurchaseRequestSvc: PurchaseRequestService) { }

  ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }

	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.PurchaseRequestLineItemSvc.get(params.get('id')))
		.subscribe((purchaseRequestLineItem: PurchaseRequestLineItem) => this.purchaseRequestLineItem = purchaseRequestLineItem); 
	
    this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.PurchaseRequestSvc.get(params.get('id')))
		.subscribe((purchaserequest: PurchaseRequest) => this.purchaserequest = purchaserequest);

	this.getProducts();
	}

}