import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-purchase-request-line-item-edit',
  templateUrl: './purchase-request-line-item-edit.component.html',
  styleUrls: ['./purchase-request-line-item-edit.component.css']
})
export class PurchaseRequestLineItemEditComponent implements OnInit {
	loggedInUser: User;

	purchaseRequestLineItem: PurchaseRequestLineItem; 

	update() {
		this.PurchaseRequestLineItemSvc.change(this.purchaseRequestLineItem).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/purchaseRequestLineItems']) 
			}
		)
	}	

  constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
  			private route: ActivatedRoute, private router: Router) { }

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

	}

}