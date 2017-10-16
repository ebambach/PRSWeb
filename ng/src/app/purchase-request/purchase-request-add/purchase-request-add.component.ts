import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PurchaseRequestService } from '../../services/purchase-request.service';
import { SystemService } from '../../services/system.service';
import { PurchaseRequest } from '../../models/PurchaseRequest';
import { User } from '../../models/User';

@Component({

  selector: 'app-purchase-request-add',
  templateUrl: './purchase-request-add.component.html',
  styleUrls: ['./purchase-request-add.component.css']
})
export class PurchaseRequestAddComponent implements OnInit {

  purchaserequest: PurchaseRequest = new PurchaseRequest(0, '', '', this.addDays(new Date(), "7"), '', 'New', 0, new Date(), 0);

  loggedInUser: User;
  
  add() {
    this.PurchaseRequestSvc.add(this.purchaserequest).then(
      resp => { 
        // console.log(resp); 
        this.router.navigate(["/Requests"]); 
      }
    );
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

  constructor(private PurchaseRequestSvc: PurchaseRequestService, private SystemSvc: SystemService,
        private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
      this.purchaserequest.UserId = this.loggedInUser.Id;
    }
  }

}