import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PurchaseRequest } from '../../models/PurchaseRequest';
import { PurchaseRequestService } from '../../services/purchase-request.service';
import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.css']
})
export class PurchaseRequestDetailComponent implements OnInit {
	loggedInUser:User;
	purchaseRequest: PurchaseRequest;
	verifyDelete: boolean = false;

	review() : void {
		this.purchaseRequest.Status = this.purchaseRequest.Total <= 50 ? "Approved" : "Review";
		this.PurchaseRequestSvc.change(this.purchaseRequest)
			.then(
				resp => {
					console.log(resp);
					this.router.navigateByUrl("/purchaseRequests");
				}
			);
	}

	remove(): void {
		this.toggleVerifyDelete();
		console.log("remove()");
		this.PurchaseRequestSvc.remove(this.purchaseRequest)
			.then(resp => { 
				console.log(resp); 
				this.router.navigate(["/purchaseRequests"]); 
			});
	}

	toggleVerifyDelete() {
		this.verifyDelete = !this.verifyDelete;
	}

	edit() {
		this.router.navigate(['/purchaseRequests/edit/'+this.purchaseRequest.Id]);
	}

 constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, 
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
			this.PurchaseRequestSvc.get(params.get('id')))
		.subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);  

			
	}

}
