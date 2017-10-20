import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [	]
})
export class LoginComponent implements OnInit {

	username: string = "admin";
	password: string = "admin";

	user: User;

	message: string = " ";

	login(): void {
		this.message = "";
		this.UserSvc.login(this.username, this.password)
			.then(resp => this.checkData(resp));
	}

	checkData(users: User[]) : void {
		if(users.length > 0) {
			this.user = users[0];
			this.SystemSvc.setLoggedIn(this.user);
			console.log("Set SystemSvc logged in user to ", this.SystemSvc.getLoggedIn());
			this.router.navigateByUrl("/home");

		} else {
			this.message = "This User Name and Password combination was not found";
		}
	}

 constructor(private SystemSvc: SystemService, private UserSvc: UserService, 
  				private router: Router ) { }

 ngOnInit() {
  	console.log("In LoginComponent");
  }

}
