import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestService } from '../../services/purchase-request.service';

@Component({
  selector: 'purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {

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
