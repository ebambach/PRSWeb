import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { User } from '../../models/User';

@Component({
  selector: 'app-purchase-request-review',
  templateUrl: './purchase-request-review.component.html',
  styleUrls: ['./purchase-request-review.component.css']
})
export class PurchaseRequestReviewComponent implements OnInit {

	purchaserequest: PurchaseRequest; 
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
    this.purchaserequest.Status = newStatus;
    this.PurchaseRequestSvc.change(this.purchaserequest)
      .then(resp => {
        console.log(resp);
        this.router.navigateByUrl("/Requests");
      })
  }

  constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, 
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
			this.PurchaseRequestSvc.get(params.get('id')))
		.subscribe((purchaserequest: PurchaseRequest) => this.purchaserequest = purchaserequest);  

	}

}