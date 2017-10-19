import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestService } from '../../services/purchase-request.service';

@Component({
  selector: 'purchase-request-review-list',
  templateUrl: './purchase-request-review-list.component.html',
  styleUrls: ['./purchase-request-review-list.component.css']
})
export class PurchaseRequestReviewListComponent implements OnInit {

	purchaseRequests: PurchaseRequest[];

	getPurchaseRequests(): void {
		this.PurchaseRequestSvc.list()
			.then(resp => {
        // console.log(resp);
        this.purchaseRequests = resp
      });
	}

  constructor(private PurchaseRequestSvc: PurchaseRequestService) { }

  ngOnInit() {
  	this.getPurchaseRequests();
  }

}
