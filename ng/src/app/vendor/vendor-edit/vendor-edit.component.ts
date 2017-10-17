import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';
import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  loggedInUser: User;

	//As with the the other components, we will create an instance
	//of the class that we are working with.
	vendor:Vendor;

	update(){
		this.VendorSvc.change(this.vendor).then(
			resp => {console.log(resp);
				this.router.navigate(['/Vendors'])}
		)
	}


  constructor(private SystemSvc: SystemService, private VendorSvc: VendorService, private route: ActivatedRoute, 
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
  	 		this.VendorSvc.get(params.get('id')))
  	 	//Subscribe reads the data currently held by Vendor, and stores it in the vendor variable above
           .subscribe((vendor: Vendor) => this.vendor = vendor);
  }

}
