import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { User } from '../../models/User';

@Component({

  selector: 'app-purchase-request-add',
  templateUrl: './purchase-request-add.component.html',
  styleUrls: ['./purchase-request-add.component.css']
})
export class PurchaseRequestAddComponent implements OnInit {

	purchaseRequest: PurchaseRequest = new PurchaseRequest(0, '', '', '', 'USPS', new Date(), new Date(), "NEW", 0, 0);

	loggedInUser: User;
	
	add() {
		this.PurchaseRequestSvc.add(this.purchaseRequest).then(
			resp => { 
				// console.log(resp); 
				this.router.navigate(["/purchaseRequests"]); 
			}
		);
	}

  constructor(private PurchaseRequestSvc: PurchaseRequestService, 
  			private SystemSvc: SystemService,
  			private router: Router) { }

  ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  		this.purchaseRequest.UserId = this.loggedInUser.Id;
  	}
  }

}
