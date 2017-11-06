import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';
import { PurchaseRequestAndLines } from '../../models/PurchaseRequestAndLines';
import { User } from '../../models/User';


@Component({
  selector: 'app-purchase-request-review',
  templateUrl: './purchase-request-review.component.html',
  styleUrls: ['./purchase-request-review.component.css']
})
export class PurchaseRequestReviewComponent implements OnInit {
  purchaseRequestLineItem: PurchaseRequestLineItem;
	purchaseRequest: PurchaseRequest; 
  purchaseRequestAndLines: PurchaseRequestAndLines;
	loggedInUser: User;

	//For approved() and rejected, we will use simple methods that use one line to
	//call a private method that only this component may use (purchase-request-line-item-review
	//will use almost exactly the same methods, but per line-item, instead of the whole request)
	approved(): void {
    this.setStatus("Approved");
  	}

  	rejected(): void {
    this.setStatus("Rejected");
  	}

  
  
  private setStatus(newStatus: string): void {
    this.purchaseRequestAndLines.PurchaseRequest.Status = newStatus;
    this.PurchaseRequestSvc.change(this.purchaseRequestAndLines.PurchaseRequest)
      .then(resp => {
        console.log(resp);
        this.router.navigateByUrl("/purchaseRequests");
      })
  }

 constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService,
              private PurchaseRequestSvc: PurchaseRequestService,
              private router: Router,
              private route: ActivatedRoute) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}

	
	this.route.paramMap
      .switchMap((params: ParamMap) =>
      this.PurchaseRequestLineItemSvc.getByPurchaseRequestId(params.get('id')))
      .subscribe((purchaseRequestAndLines: PurchaseRequestAndLines) => this.purchaseRequestAndLines = purchaseRequestAndLines);  
      //   this.PurchaseRequestSvc.get(params.get('id')))
      // .subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);

	}

}