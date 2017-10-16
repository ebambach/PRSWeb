import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

import {SystemService} from '../../services/system.service';

import {User} from '../../models/User';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	products: Product[];
  loggedInUser: User;

  getProducts(): void {
  	this.ProductSvc.list()
  	.then(resp => this.products = resp);
  }

  constructor(private SystemSvc: SystemService, private ProductSvc: ProductService, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }
    
  	this.getProducts();
  }

}