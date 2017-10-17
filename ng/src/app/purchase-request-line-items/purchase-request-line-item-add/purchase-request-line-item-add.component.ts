import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestLineItemService } from '../../services/purchase-request-line-item.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequestLineItem } from '../../models/PurchaseRequestLineItem';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-purchase-request-line-item-add',
  templateUrl: './purchase-request-line-item-add.component.html',
  styleUrls: ['./purchase-request-line-item-add.component.css']
})
export class PurchaseRequestLineItemAddComponent implements OnInit {
  loggedInUser: User;

  purchaseRequestLineItem: PurchaseRequestLineItem; 

  add() {
    this.PurchaseRequestLineItemSvc.add(this.purchaseRequestLineItem).then(
      resp => { 
        console.log(resp); 
        this.router.navigate(['/LineItems']) 
      }
    )
  }  

  constructor(private SystemSvc: SystemService, private PurchaseRequestLineItemSvc: PurchaseRequestLineItemService, 
        private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }
  
  }
}