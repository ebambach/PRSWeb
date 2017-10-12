import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Vendor} from '../../models/Vendor';
import {VendorService} from '../../services/vendor.service';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	vendors: Vendor[];
	products: Product[];

  getProducts(): void {
  	this.ProductSvc.list()
  	.then(resp => this.products = resp);
  }

  constructor(private ProductSvc: ProductService) { }

  ngOnInit() {
  	this.getProducts();
  }

}