// The items we are importing are classes
import { Component, OnInit } from '@angular/core';

//Will be used to route the user to another page
//once the login succeeds
import {Router} from '@angular/router';

//We are going to want to able to use Promise, so need to import this
import 'rxjs/add/operator/toPromise';

// To get to location of the User.ts file, we first go up one level, as represented by the ".."
	//After we go up one level, we go to the models folder, where the User.ts file is
import {User} from '../models/User';
import {UserService} from '../services/user.service';

import {SystemService} from '../services/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

	username:string = "";
	password:string = "";
	message:string = "";

	user: User;

	//Similar to the example we set up under ngOnInit(), this login() passes in the url, with
	//the keys for the UserName and Password we send in looking something like:
		//"http://localhost:62140/Users/Login?UserName=user&Password=user"

	login(): void{
		this.message = "";
		this.UserSvc.login(this.username, this.password).then(resp => this.checkData(resp));
		console.log(this.username, this.password);
		//Instead of the commented out items, we are now going to use the User service
			// //Let's set up the parameters we will be using to look up the user
			// let parms = "UserName=" + this.username + "&Password=" + this.password;
			// console.log(parms);
			// //Everything past the question mark is a key we will be using for the login
			// //process
			// this.http.get("http://localhost:62140/Users/Login?" + parms)
			// 	.subscribe(data => {this.checkData(data); });
	}

	//If the user doesn't exist, it will return null.
	//Else, the user information will be logged to the console.
	checkData(users: User[]): void{
		if(users.length > 0){
			//this.user = users[0];
			this.user = users[0];
			this.SystemSvc.setLoggedIn(this.user);
			this.router.navigateByUrl("/Home");
			console.log("The currently logged in user is ", this.SystemSvc.getLoggedIn());
		}else{
			this.message = "This User Name and Password combination was not found";
		}
	}

  constructor(private UserSvc: UserService, private SystemSvc: SystemService, private router: Router) { }

  ngOnInit() {
  }

}
