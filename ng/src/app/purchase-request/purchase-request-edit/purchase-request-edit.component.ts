import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestService } from '../../services/purchase-request.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequest } from '../../models/PurchaseRequest';

import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {
	users: User[];
	loggedInUser:User;
	purchaseRequest: PurchaseRequest; 
	
	getUsers(): void {
		this.UserSvc.list()
			.then(resp => this.users = resp);
	}

	update() {
		this.PurchaseRequestSvc.change(this.purchaseRequest).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/purchaseRequests']) 
			}
		)
	}	

	

 constructor(private UserSvc: UserService, private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, 
  			private route: ActivatedRoute, 
  			private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
  	this.getUsers();
  	
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.PurchaseRequestSvc.get(params.get('id')))
			.subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);  

		
	}

}
