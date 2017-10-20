import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: User[];
  loggedInUser: User;

	getUsers(): void {
		this.UserSvc.list()
			.then(resp => this.users = resp);
	}

 constructor(private SystemSvc: SystemService, private UserSvc: UserService,
             private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
  	this.getUsers();
  }

}
