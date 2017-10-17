import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {SystemService} from '../../services/system.service';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  loggedInUser: User;
	user:User;

	update(){
		this.UserSvc.change(this.user).then(
			resp => {console.log(resp);
				this.router.navigate(['/Users'])}
		)
	}

  cancel(){
    this.router.navigate(['/Users'])
  }

  constructor(private SystemSvc: SystemService, private UserSvc: UserService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }

  	this.route.paramMap
  	 	.switchMap((params: ParamMap) =>
  	 		this.UserSvc.get(params.get('id')))
  	 	//Subscribe reads the data currently held by User, and stores it in the user variable above
           .subscribe((user: User) => this.user = user);
  }

}
