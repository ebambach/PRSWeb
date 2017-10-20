import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestService } from '../../services/purchase-request.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequest } from '../../models/PurchaseRequest';

import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {
	loggedInUser:User;
	purchaseRequest: PurchaseRequest; 

	update() {
		this.PurchaseRequestSvc.change(this.purchaseRequest).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/purchaseRequests']) 
			}
		)
	}	

 constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, 
  			private route: ActivatedRoute, 
  			private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.PurchaseRequestSvc.get(params.get('id')))
			.subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);  

	}

}
