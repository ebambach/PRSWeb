import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseRequestService } from '../../services/purchase-request.service';

import 'rxjs/add/operator/switchMap';

import { PurchaseRequest } from '../../models/PurchaseRequest';

@Component({
  selector: 'app-purchase-request-edit',
  templateUrl: './purchase-request-edit.component.html',
  styleUrls: ['./purchase-request-edit.component.css']
})
export class PurchaseRequestEditComponent implements OnInit {

	purchaseRequest: PurchaseRequest; 

	update() {
		this.PurchaseRequestSvc.change(this.purchaseRequest).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/purchaseRequests']) 
			}
		)
	}	

  constructor(private PurchaseRequestSvc: PurchaseRequestService, 
  			private route: ActivatedRoute, 
  			private router: Router) { }

  ngOnInit() {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.PurchaseRequestSvc.get(params.get('id')))
			.subscribe((purchaseRequest: PurchaseRequest) => this.purchaseRequest = purchaseRequest);  

	}

}
