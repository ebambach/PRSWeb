import { Injectable } from '@angular/core';

import {User} from '../models/User';

@Injectable()
export class SystemService {

	LoggedInUser: User;
	getLoggedIn(): User{
		console.log("SystemSerivce", "getLoggedIn()", this.LoggedInUser);
		return this.LoggedInUser;
	}

	setLoggedIn(user: User): void{
		console.log("SystemSerivce", "setLoggedIn()", this.LoggedInUser);
		this.LoggedInUser = user;
	}

	IsLoggedIn(): boolean{
		console.log("SystemSerivce", "setLoggedIn()", this.LoggedInUser != null);
		return this.LoggedInUser != null;
	}

  constructor() { }

}
