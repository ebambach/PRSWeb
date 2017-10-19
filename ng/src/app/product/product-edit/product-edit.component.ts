import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';
import { VendorService } from '../../services/vendor.service';

import 'rxjs/add/operator/switchMap';

import { Product } from '../../models/Product';
import { Vendor } from '../../models/Vendor';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

	product: Product; 
	vendors: Vendor[];

	update() {
		this.ProductSvc.change(this.product).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/products']) 
			}
		)
	}	

	getVendors(): void {
		this.VendorSvc.list()
			.then(resp => this.vendors = resp);
	}


  constructor(private ProductSvc: ProductService, 
  			private VendorSvc: VendorService,
  			private route: ActivatedRoute, 
  			private router: Router) { }

  ngOnInit() {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.ProductSvc.get(params.get('id')))
			.subscribe((product: Product) => this.product = product);  

		this.getVendors();
	}

}
