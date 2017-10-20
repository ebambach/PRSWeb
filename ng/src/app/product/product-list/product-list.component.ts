import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  loggedInUser:User;
	products: Product[];

	getProducts(): void {
		this.ProductSvc.list()
			.then(resp => this.products = resp);
	}

 constructor(private SystemSvc: SystemService, private ProductSvc: ProductService,
   private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
  	this.getProducts();
  }

}
