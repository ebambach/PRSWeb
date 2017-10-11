import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  getUsers(): void {
  	this.UserSvc.list()
  	.then(resp => this.users = resp);
  }

  //In order to use the UserService, we need to remember to not
  //just import it, but to add it to the constructor
  constructor(private UserSvc: UserService) { }

  ngOnInit() {
  	this.getUsers();
  }

}
