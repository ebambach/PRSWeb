import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { User } from '../../models/User';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {

	purchaserequest: PurchaseRequest; 
	loggedInUser: User;

	update() {
		this.PurchaseRequestSvc.change(this.purchaserequest).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/Requests']) 
			}
		)
	}	

  constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, private route: ActivatedRoute, 
  			private router: Router) { }

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