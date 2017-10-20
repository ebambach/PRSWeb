import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

import {SystemService} from '../../services/system.service';
import {User} from '../../models/User';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	loggedInUser: User;
	product: Product;
	verifyDelete: boolean = false;

	remove() {
		this.toggleVerifyDelete();
		console.log("remove()");
		this.ProductSvc.remove(this.product)
			.then(resp => { 
				console.log(resp); 
				this.router.navigate(["/products"]); 
			});
	}

	toggleVerifyDelete() {
		this.verifyDelete = !this.verifyDelete;
	}

	edit() {
		this.router.navigate(['/products/edit/'+this.product.Id]);
	}

 constructor(private SystemSvc: SystemService, private ProductSvc: ProductService, 
 	private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.ProductSvc.get(params.get('id')))
			.subscribe((product: Product) => this.product = product);  
	}

}
