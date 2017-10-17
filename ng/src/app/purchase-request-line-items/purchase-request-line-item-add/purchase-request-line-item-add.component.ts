import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-purchase-request-line-item-add',
  templateUrl: './purchase-request-line-item-add.component.html',
  styleUrls: ['./purchase-request-line-item-add.component.css']
})
export class PurchaseRequestLineItemAddComponent implements OnInit {
  loggedInUser: User;

  constructor(private SystemSvc: SystemService, private router: Router) { }


  ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }
  }

}