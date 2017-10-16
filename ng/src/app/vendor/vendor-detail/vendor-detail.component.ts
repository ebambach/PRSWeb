import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';
import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  loggedInUser: User;

	vendor: Vendor;

  remove(){
    console.log("remove()");
    this.VendorSvc.remove(this.vendor)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/Vendors']);
      });
  }

  // This constructor will be used to pull the vendor out the route, but not just any vendor, a particular vendor
  constructor(private SystemSvc: SystemService, private VendorSvc: VendorService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }

  	 this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.VendorSvc.get(params.get('id')))
           .subscribe((vendor: Vendor) => this.vendor = vendor);
  }

}
