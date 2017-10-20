import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';
import { User } from '../../models/User';

@Component({

  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

	loggedInUser: User;
	
	//Fills in the add() fields with blank spaces, and sets the IsReviewer and IsAdmin
	//fields to false by default
	user: User = new User(0, '', '', '', '', '', '', false, false);
	
	add() {
		this.UserSvc.add(this.user).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(["/users"]); 
			}
		);
	}

 constructor(private SystemSvc: SystemService, private UserSvc: UserService, private router: Router) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
  }

}
