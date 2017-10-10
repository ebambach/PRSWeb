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
  		//The .then determines what a Promise returns
  		.then(resp => resp.json() as User[])
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
