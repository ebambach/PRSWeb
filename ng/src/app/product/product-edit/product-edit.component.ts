import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

	//As with the the other components, we will create an instance
	//of the class that we are working with.
	vendor:Vendor;
	product:Product;

	update(){
		this.ProductSvc.change(this.product).then(
			resp => {console.log(resp);
				this.router.navigate(['/Products'])}
		)
	}

  constructor(private ProductSvc: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.ProductSvc.get(params.get('id')))
  	 	//Subscribe reads the data currently held by Product, and stores it in the product variable above
           .subscribe((product: Product) => this.product = product);
  }

}
