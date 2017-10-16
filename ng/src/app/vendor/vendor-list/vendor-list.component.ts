import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/toPromise';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';
import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  loggedInUser: User;

	vendors: Vendor[];

  getVendors(): void {
  	this.VendorSvc.list()
  	.then(resp => this.vendors = resp);
  }

  constructor(private SystemSvc: SystemService, private VendorSvc: VendorService, private router:Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }

  	this.getVendors();
  }

}
