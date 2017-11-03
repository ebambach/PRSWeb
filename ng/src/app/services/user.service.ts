import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from '../models/User';

const urlBase = 'http://localhost:62140/';
const mvcCtrl = 'Users/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class UserService {

	private headers = new Headers({
		'Access-Control-Allow-Origin': '*', 
		'Accepts': 'application/json', 
		'Content-Type': 'application/json'
	});

 constructor(private http: Http) { }

  	login(username: string, password: string): Promise<User[]> {
  		let parms = "UserName=" + username + "&Password=" + password;
		return this.http.get(url+'Login?'+parms)
			.toPromise()
			.then(resp => resp.json() as User[])
			.catch(this.handleError);	  	
	}

	list(): Promise<User[]> {
		return this.http.get(url+'List')
			.toPromise()
			.then(resp => resp.json() as User[])
			.catch(this.handleError);	
	}

	get(id): Promise<User> {
		return this.http.get(url+'Get/'+id)
			.toPromise()
			.then(resp => resp.json() as User)
			.catch(this.handleError);	
	}

	add(user: User): Promise<any> {
		return this.http.post(url+'Add', user)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	change(user: User): Promise<any> {
		return this.http.post(url+'Change', user)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	remove(user: User): Promise<any> {
		return this.http.post(url+'Remove', user)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);	
	}
	private handleError(error: any): Promise<any> {
		console.error('An error has occurred', error);
		return Promise.reject(error.message || error);
	}	  

}
