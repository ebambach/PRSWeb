import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

import {SystemService} from '../../services/system.service';

import {User} from '../../models/User';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = new Product(0, '', '', 0, 'Each', '', 0);
  vendors: Vendor[];
  loggedInUser: User;

	add(){
		this.ProductSvc.add(this.product).then(
			resp => {
				this.router.navigate(["/Products"]);
				console.log(resp);
			})
	}

	getVendors(): void {
		this.VendorSvc.list()
			.then(resp => this.vendors = resp);	}

  

  constructor(private SystemSvc: SystemService, private ProductSvc: ProductService, private VendorSvc: VendorService, private router: Router) { }

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
