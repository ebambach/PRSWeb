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
  //Do we want to see all purchaseRequests, or the ones with a status of 
  //"NEW," "Review," "Rejected," or "Accepted"
  IsAll: boolean;
  IsNew: boolean;
  IsReview: boolean;
  IsRejected: boolean;
  IsApproved: boolean;

  //This code will let the other toggle methods be more
  //elegant, by first changing all of the booleans to false,
  //and then changing only the ones we want to true within
  //the other toggle methods.
  toggleFalse(){
    this.IsAll = false;
    this.IsNew = false;
    this.IsReview = false;
    this.IsRejected = false;
    this.IsApproved = false;
  }

	toggleNew(){
    this.toggleFalse();
    this.IsNew = true;    
    console.log("running toggleNew");
    console.log("IsAll = " + this.IsAll);
    console.log("IsNew = " + this.IsNew);
    console.log("IsReview = " + this.IsReview);
    console.log("IsRejected = " + this.IsRejected);
    console.log("IsApproved = " + this.IsApproved);
  }

  toggleReview(){
    this.toggleFalse();
    this.IsReview = true;
    console.log("running toggleReview");
    console.log("running toggleNew");
    console.log("IsAll = " + this.IsAll);
    console.log("IsNew = " + this.IsNew);
    console.log("IsReview = " + this.IsReview);
    console.log("IsRejected = " + this.IsRejected);
    console.log("IsApproved = " + this.IsApproved);
  }

  toggleRejected(){
    this.toggleFalse();
    this.IsRejected = true;
    console.log("running toggleRejected");
    console.log("running toggleNew");
    console.log("IsAll = " + this.IsAll);
    console.log("IsNew = " + this.IsNew);
    console.log("IsReview = " + this.IsReview);
    console.log("IsRejected = " + this.IsRejected);
    console.log("IsApproved = " + this.IsApproved);
  }

  toggleApproved(){
    this.toggleFalse();
    this.IsApproved = true;
    console.log("running toggleApproved");
    console.log("running toggleNew");
    console.log("IsAll = " + this.IsAll);
    console.log("IsNew = " + this.IsNew);
    console.log("IsReview = " + this.IsReview);
    console.log("IsRejected = " + this.IsRejected);
    console.log("IsApproved = " + this.IsApproved);
  }

  //If we want to see all of the purchaseRequests,
  //we want all of our filter booleans to read true.
  toggleAll(){
    this.toggleFalse();
    this.IsAll = true;
  }

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
  	this.toggleAll();
    console.log("running toggleTrue");
    console.log("running toggleNew");
    console.log("IsAll = " + this.IsAll);
    console.log("IsNew = " + this.IsNew);
    console.log("IsReview = " + this.IsReview);
    console.log("IsRejected = " + this.IsRejected);
    console.log("IsApproved = " + this.IsApproved);
    this.getPurchaseRequests();    
  }

}
