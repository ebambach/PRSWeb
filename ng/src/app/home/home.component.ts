import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {SystemService} from '../services/system.service';

import {User} from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	loggedInUser: User;

  constructor(private SystemSvc: SystemService, private router: Router) { }

  ngOnInit() {
  	//This code reroutes the user to the Login page if a specific user is
  	//not currently logged in.  UNCOMMENT when testing is done!
  	// if (!this.SystemSvc.IsLoggedIn()){
  	// 	this.router.navigateByUrl('/Login');
  	// }
  	this.loggedInUser = this.SystemSvc.getLoggedIn();
  }

}
