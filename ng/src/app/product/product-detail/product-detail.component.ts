import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

import {SystemService} from '../../services/system.service';

import {User} from '../../models/User';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	product: Product;
  loggedInUser: User;

  remove(){
    console.log("remove()");
    this.ProductSvc.remove(this.product)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/Products']);
      });
  }

  // This constructor will be used to pull the product out the route, but not just any product, a particular product
  constructor(private SystemSvc: SystemService, private ProductSvc: ProductService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser);
    }
  	 
     this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.ProductSvc.get(params.get('id')))
           .subscribe((product: Product) => this.product = product);
  }

}