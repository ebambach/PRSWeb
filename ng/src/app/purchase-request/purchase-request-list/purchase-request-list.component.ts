import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestLineItem} from '../../models/PurchaseRequestLineItem';
import {PurchaseRequestService} from '../../services/purchase-request.service';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {
  loggedInUser: User;
	purchaserequests: PurchaseRequest[];


  getPurchaseRequests(): void {
  	this.PurchaseRequestSvc.list()
  	.then(resp => this.purchaserequests = resp);
  }

  constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser);
    }

  	this.getPurchaseRequests();
  }

}