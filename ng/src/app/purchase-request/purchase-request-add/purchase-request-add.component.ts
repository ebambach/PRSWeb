import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestService} from '../../services/purchase-request.service';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-purchase-request-add',
  templateUrl: './purchase-request-add.component.html',
  styleUrls: ['./purchase-request-add.component.css']
})
export class PurchaseRequestAddComponent implements OnInit {

  purchaserequest: PurchaseRequest = new PurchaseRequest(0, '', '', this.addDays(new Date(), "7"), '', '', 0, new Date(), 0);
  users: User[];
  

	add(){
		this.PurchaseRequestSvc.add(this.purchaserequest).then(
			resp => {
				this.router.navigate(["/Requests"]);
				console.log(resp);
			})
	}

	getUsers(): void {
		this.UserSvc.list()
			.then(resp => this.users = resp);
	}

	//The purpose of this function is to take a Date, and add days to it.  To do this,
	//the function takes a Date, in this case "new Date()," which is the current date.
	//The second parameter is the number of days we want to add, written as a string.
	addDays(date: Date, days: string): Date {
    	console.log('adding ' + days + ' days');
    	console.log(date);

    	date.setDate(date.getDate() + parseInt(days));
    	console.log(date);

    	return date;
	}
  

  constructor(private PurchaseRequestSvc: PurchaseRequestService, private UserSvc: UserService, private router: Router) { }

  ngOnInit() {
  	this.getUsers();
  }

}
