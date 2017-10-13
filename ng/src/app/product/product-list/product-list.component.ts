import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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