import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SystemService } from '../services/system.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  loggedInUser: User;

  constructor(private SystemSvc: SystemService, private router: Router) { 
  }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  	this.loggedInUser = this.SystemSvc.getLoggedIn();
  }

}
