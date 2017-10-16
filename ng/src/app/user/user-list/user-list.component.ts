import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/toPromise';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loggedInUser: User;
  users: User[];

  getUsers(): void {
  	this.UserSvc.list()
  	.then(resp => this.users = resp);
  }

  //In order to use the UserService, we need to remember to not
  //just import it, but to add it to the constructor
  constructor(private SystemSvc: SystemService, private UserSvc: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.SystemSvc.IsLoggedIn()) {
       this.router.navigateByUrl("\Login");
    } else {
      this.loggedInUser = this.SystemSvc.getLoggedIn();
      console.log("The logged in User is " + this.loggedInUser.UserName);
    }

  	this.getUsers();
  }

}
