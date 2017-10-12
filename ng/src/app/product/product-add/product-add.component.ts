import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  vendor: Vendor;
  product: Product = new Product(0, '', '', 0, '', 'photo', 0, this.vendor);

	add(){
		this.ProductSvc.add(this.product).then(
			resp => {
				this.router.navigate(["/Products"]);
				console.log(resp);
			})
	}

  constructor(private ProductSvc: ProductService, private router: Router) { }

  ngOnInit() {
  }

}
