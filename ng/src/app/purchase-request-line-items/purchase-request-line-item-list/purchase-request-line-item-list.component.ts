import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import { PurchaseRequestAndLines } from '../../models/PurchaseRequestAndLines';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'purchase-request-line-item-list',
  templateUrl: './purchase-request-line-item-list.component.html',
  styleUrls: ['./purchase-request-line-item-list.component.css']
})
export class PurchaseRequestLineItemListComponent implements OnInit {
  loggedInUser: User;

	purchaseRequestAndLines: PurchaseRequestAndLines;

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
			this.PurchaseRequestLineItemSvc.getById(params.get('id')))
		.subscribe((purchaseRequestAndLines: PurchaseRequestAndLines) => this.purchaseRequestAndLines = purchaseRequestAndLines);  

  }

}