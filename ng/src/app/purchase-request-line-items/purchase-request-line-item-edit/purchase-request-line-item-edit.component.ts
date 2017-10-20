import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {
	loggedInUser:User;
	purchaseRequestLineItem: PurchaseRequestLineItem; 
	Product:Product;
	products: Product[];

	getProducts(): void {
		this.ProductSvc.list()
			.then(resp => this.products = resp);
	}

	update() {
		this.PurchaseRequestLineItemSvc.change(this.purchaseRequestLineItem).then(
			resp => { 
				console.log(resp); 
				this.router.navigateByUrl('/purchaseRequestLineItems/'+this.purchaseRequestLineItem.PurchaseRequestId); 
			}
		)
	}

 constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
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
				this.PurchaseRequestLineItemSvc.get(params.get('id')))
			.subscribe((purchaseRequestLineItem: PurchaseRequestLineItem) => this.purchaseRequestLineItem = purchaseRequestLineItem);  

		console.log("Read PRLI", this.purchaseRequestLineItem);
		this.getProducts();
	}

}
