import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestLineItem} from '../../models/PurchaseRequestLineItem';
import {PurchaseRequestService} from '../../services/purchase-request.service';

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css']
})
export class PurchaseRequestListComponent implements OnInit {

	purchaserequests: PurchaseRequest[];


  getPurchaseRequests(): void {
  	this.PurchaseRequestSvc.list()
  	.then(resp => this.purchaserequests = resp);
  }

  constructor(private PurchaseRequestSvc: PurchaseRequestService) { }

  ngOnInit() {
  	this.getPurchaseRequests();
  }

}