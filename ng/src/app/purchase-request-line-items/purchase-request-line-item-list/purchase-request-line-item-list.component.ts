import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import { PurchaseRequestAndLines } from '../../models/PurchaseRequestAndLines';

@Component({
  selector: 'purchase-request-line-item-list',
  templateUrl: './purchase-request-line-item-list.component.html',
  styleUrls: ['./purchase-request-line-item-list.component.css']
})
export class PurchaseRequestLineItemListComponent implements OnInit {

	purchaseRequestAndLines: PurchaseRequestAndLines;

  constructor(private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService,
  			private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.PurchaseRequestLineItemSvc.getByPurchaseRequestId(params.get('id')))
		.subscribe((purchaseRequestAndLines: PurchaseRequestAndLines) => this.purchaseRequestAndLines = purchaseRequestAndLines);  

  }

}
