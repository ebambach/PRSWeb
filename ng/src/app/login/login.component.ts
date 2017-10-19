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
		// let parms = "UserName=" + this.username + "&Password=" + this.password;
	 //  	this.http.get("http://localhost:62140/Users/Login?" + parms)
	 //  		.subscribe(data => { this.checkData(data); });
	}

	checkData(users: User[]) : void {
		if(users.length > 0) {
			this.user = users[0];
			this.SystemSvc.setLoggedIn(this.user);
			console.log("Set SystemSvc logged in user to ", this.SystemSvc.getLoggedIn());
			this.router.navigateByUrl("/home");

		} else {
			this.message = "USER NAME AND/OR PASSWORD NOT FOUND";
		}
	}

  constructor(private UserSvc: UserService, 
  				private SystemSvc: SystemService, 
  				private router: Router ) { }

  ngOnInit() {
  	console.log("In LoginComponent");
  }

}
