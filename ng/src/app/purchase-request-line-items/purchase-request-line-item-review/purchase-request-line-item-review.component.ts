import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import { PurchaseRequestAndLines } from '../../models/PurchaseRequestAndLines';
import { PurchaseRequest } from '../../models/PurchaseRequest';

@Component({
  selector: 'purchase-request-line-item-review',
  templateUrl: './purchase-request-line-item-review.component.html',
  styleUrls: ['./purchase-request-line-item-review.component.css']
})
export class PurchaseRequestLineItemReviewComponent implements OnInit {

	purchaseRequestAndLines: PurchaseRequestAndLines;

  approved(): void {
    this.setStatus("APPROVED");
  }
  rejected(): void {
    this.setStatus("REJECTED");
  }
  private setStatus(newStatus: string): void {
    let purchaseRequest: PurchaseRequest = this.purchaseRequestAndLines.PurchaseRequest;
    purchaseRequest.Status = newStatus;
    this.PurchaseRequestSvc.change(purchaseRequest)
      .then(resp => {
        console.log(resp);
        this.router.navigateByUrl("/purchaseRequests/review");
      })
  }

  constructor(private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService,
              private PurchaseRequestSvc: PurchaseRequestService,
              private router: Router,
  			      private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.PurchaseRequestLineItemSvc.getByPurchaseRequestId(params.get('id')))
		.subscribe((purchaseRequestAndLines: PurchaseRequestAndLines) => this.purchaseRequestAndLines = purchaseRequestAndLines);  

  }

}
