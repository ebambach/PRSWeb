import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import {User} from '../models/User';

//Because we will reuse the address information, we'll set it
//up here as a set of variables
const urlBase = "http://localhost:62140/";
const mvcCtrl = 'Users/';
const url: string = urlBase + mvcCtrl;


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  //This login method takes the username and password parameters, and
  //makes a Promise to return that User, in the event that the user is found.
  login(username: string, password: string): Promise<User[]>{
  	let parms = "UserName=" + username + "&Password=" + password;
  	return this.http.get(url+'Login?'+parms)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, the user
  		.then(resp => resp.json() as User[])
  		.catch(this.handleError);
  }

  list():Promise<User[]>{
  	return this.http.get(url+'List')
  		.toPromise()
  		//This .then returns a list of the users
  		.then(resp => resp.json() as User[])
  		.catch(this.handleError);
  }

  get(id): Promise<User>{
  	return this.http.get(url+'Get/'+ id)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified user
  		.then(resp => resp.json() as User)
  		.catch(this.handleError);
  }

  change(user: User): Promise<User>{
  	// This function requires the user to be passed in, so we can change it
  		//Because we are making a change, just like when we use the Postman app,
  		//we need to use "post" instead of "get"
	return this.http.post(url+'Change', user)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified user
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }

  add(user: User): Promise<User>{
  	return this.http.post(url+'Add', user)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified user
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }
  
  //This private function takes a parameter called error, of type
  //any (a generic type, because we don't know what it could be).
  	//The return type is a Promise, also of type any.
  private handleError(error:any):Promise<any>{
  		console.error('An error has occurred', error);
  		//When the Promise fails, it sends the error message.
  		return Promise.reject(error.message || error);
  }
}
