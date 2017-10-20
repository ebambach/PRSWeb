import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { SystemService } from '../../services/system.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

	user: User;
	loggedInUser: User;
	// Until the user presses the "Delete" button, we want to keep
	//this as false, to hide the "Verify" button in the html
	verifyDelete: boolean = false;

	remove() {
		this.toggleVerifyDelete();
		console.log("remove()");
		this.UserSvc.remove(this.user)
			.then(resp => { 
				console.log(resp); 
				this.router.navigate(["/users"]); 
			});
	}

	toggleVerifyDelete() {
		this.verifyDelete = !this.verifyDelete;
	}

	edit() {
		this.router.navigate(['/users/edit/'+this.user.Id]);
	}

 constructor(private SystemSvc: SystemService, private UserSvc: UserService, 
 	private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {
  	if(!this.SystemSvc.IsLoggedIn()) {
  		this.router.navigateByUrl("\login");
  	} else {
  		this.loggedInUser = this.SystemSvc.getLoggedIn();
  	}
	this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.UserSvc.get(params.get('id')))
		.subscribe((user: User) => this.user = user);  
		
	}

}
