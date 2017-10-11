import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

	vendors: Vendor[];

  getVendors(): void {
  	this.VendorSvc.list()
  	.then(resp => this.vendors = resp);
  }

  constructor(private VendorSvc: VendorService) { }

  ngOnInit() {
  	this.getVendors();
  }

}
