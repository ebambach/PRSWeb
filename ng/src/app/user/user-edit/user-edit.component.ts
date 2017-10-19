import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';

import 'rxjs/add/operator/switchMap';

import { User } from '../../models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

	user: User; 
	loggedInUser: User;

	update() {
		this.UserSvc.change(this.user).then(
			resp => { 
				console.log(resp); 
				this.router.navigate(['/users']) 
			}
		)
	}	


  constructor(private SystemSvc: SystemService, 
  			private UserSvc: UserService, 
  			private route: ActivatedRoute, 
  			private router: Router) { }

  ngOnInit() {
	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.UserSvc.get(params.get('id')))
		.subscribe((user: User) => this.user = user);  

  	this.loggedInUser = this.SystemSvc.getLoggedIn();
  }

}
