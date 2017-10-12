import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	vendor: Vendor;
	product: Product;

  remove(){
    console.log("remove()");
    this.ProductSvc.remove(this.product)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/Products']);
      });
  }

  // This constructor will be used to pull the product out the route, but not just any product, a particular product
  constructor(private ProductSvc: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	 this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.ProductSvc.get(params.get('id')))
           .subscribe((product: Product) => this.product = product);
  }

}