import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {SystemService} from '../../services/system.service';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  loggedInUser: User;
	user: User;

  remove(){
    console.log("remove()");
    this.UserSvc.remove(this.user)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/Users']);
      });
  }

  // This constructor will be used to pull the user out the route, but not just any user, a particular user
  constructor(private SystemSvc: SystemService, private UserSvc: UserService, private router: Router, 
    private route: ActivatedRoute) { }

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
           .subscribe((user: User) => this.user = user);
  }

}