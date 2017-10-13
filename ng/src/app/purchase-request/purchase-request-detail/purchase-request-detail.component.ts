import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestService} from '../../services/purchase-request.service';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.component.html',
  styleUrls: ['./purchase-request-detail.component.css']
})
export class PurchaseRequestDetailComponent implements OnInit {

	purchaserequest: PurchaseRequest;

  // remove(){
  //   console.log("remove()");
  //   this.PurchaseRequestSvc.remove(this.purchaserequest)
  //     .then(resp => {
  //       console.log(resp);
  //       this.router.navigate(['/PurchaseRequests']);
  //     });
  // }

  // This constructor will be used to pull the purchaserequest out the route, but not just any purchaserequest, a particular purchaserequest
  constructor(private PurchaseRequestSvc: PurchaseRequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	 this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.PurchaseRequestSvc.get(params.get('id')))
           .subscribe((purchaserequest: PurchaseRequest) => this.purchaserequest = purchaserequest);
  }

}