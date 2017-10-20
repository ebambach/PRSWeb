import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestService } from '../../services/purchase-request.service';

import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

@Component({
  selector: 'purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  loggedInUser: User;
	purchaseRequests: PurchaseRequest[];

	getPurchaseRequests(): void {
		this.PurchaseRequestSvc.list()
			.then(resp => {
        this.purchaseRequests = resp
      });
	}

 constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService,
   private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
  	this.getPurchaseRequests();
  }

}
