import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {PurchaseRequest} from '../../models/PurchaseRequest';
import {PurchaseRequestService} from '../../services/purchase-request.service';

import {User} from '../../models/User';
import {SystemService} from '../../services/system.service';


@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  loggedInUser: User;

 constructor(private SystemSvc: SystemService, private PurchaseRequestSvc: PurchaseRequestService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
