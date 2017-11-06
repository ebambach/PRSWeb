import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestService } from '../../services/purchase-request.service';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { User } from '../../models/User';

@Component({

  selector: 'app-purchase-request-line-item-add',
  templateUrl: './purchase-request-line-item-add.component.html',
  styleUrls: ['./purchase-request-line-item-add.component.css']
})
export class PurchaseRequestLineItemAddComponent implements OnInit {

	
	purchaseRequest: PurchaseRequest;
	purchaseRequestLineItem: PurchaseRequestLineItem = new PurchaseRequestLineItem(0, 0, this.purchaseRequest, 1);

	loggedInUser: User;
	
	products: Product[];

	getProducts(): void {
		this.ProductSvc.list()
			.then(resp => this.products = resp);
	}

	add() {
		this.purchaseRequestLineItem.PurchaseRequest.Id = this.purchaseRequest.Id;
		this.PurchaseRequestLineItemSvc.add(this.purchaseRequestLineItem).then(
			resp => { 
				console.log(resp); 
				this.router.navigateByUrl("/purchaseRequestLineItems/"+this.purchaseRequest.Id); 
			}
		);
	}

 constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
  			private PurchaseRequestSvc: PurchaseRequestService,
  			private ProductSvc: ProductService, private route: ActivatedRoute,
  			private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}

	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.PurchaseRequestSvc.get(params.get('id')))
		.subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);  

	this.getProducts();
  }

}
