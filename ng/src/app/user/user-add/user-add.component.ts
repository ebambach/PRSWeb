import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {SystemService} from '../../services/system.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
	loggedInUser: User;
	//Fills in the add() fields with blank spaces, and sets the IsReviewer and IsAdmin
	//false by default
	user: User = new User(0, '', '', '', '', '', '', false, false);

	add(){
		this.UserSvc.add(this.user).then(
			resp => {
				this.router.navigate(["/Users"]);
				console.log(resp);
			})
	}

  constructor(private SystemSvc: SystemService, private UserSvc: UserService, private router: Router) { }

  ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }
  }

}
