import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
  })
export class VendorAddComponent implements OnInit {

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

  constructor(private VendorSvc: VendorService, private router: Router) { }

  ngOnInit() {
  }

}
