import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-purchase-request-line-item-detail',
  templateUrl: './purchase-request-line-item-detail.component.html',
  styleUrls: ['./purchase-request-line-item-detail.component.css']
})
export class PurchaseRequestLineItemDetailComponent implements OnInit {
	loggedInUser:User;
	purchaseRequestLineItem: PurchaseRequestLineItem;

	remove(): void {
		console.log("remove()");
		this.PurchaseRequestLineItemSvc.remove(this.purchaseRequestLineItem)
			.then(resp => { 
				console.log(resp); 
				this.router.navigateByUrl("/purchaseRequestLineItems/"+this.purchaseRequestLineItem.PurchaseRequestId); 
			});
	}


 constructor(private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
  				private SystemSvc: SystemService, private router: Router, 
  				private route: ActivatedRoute) { }

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

			
	}

}
