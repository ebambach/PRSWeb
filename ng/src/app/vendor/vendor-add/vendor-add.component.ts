import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';
import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
  })
export class VendorAddComponent implements OnInit {
  loggedInUser: User;

  //Unlike when we added blank fields to a new user, there are more fields,
  //and there is only one boolean.
  vendor: Vendor = new Vendor(0, '', '', '', '', '', '', '', '', false);

	add(){
		this.VendorSvc.add(this.vendor).then(
			resp => {
				this.router.navigate(["/Vendors"]);
				console.log(resp);
			})
	}

  constructor(private SystemSvc: SystemService, private VendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }
    
  }

}
