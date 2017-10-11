import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import {Vendor} from '../models/Vendor';

//Because we will reuse the address information, we'll set it
//up here as a set of variables
const urlBase = "http://localhost:62140/";
const mvcCtrl = 'Vendors/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class VendorService {

 constructor(private http: Http) { }

  list():Promise<Vendor[]>{
  	return this.http.get(url+'List')
  		.toPromise()
  		//This .then returns a list of the users
  		.then(resp => resp.json() as Vendor[])
  		.catch(this.handleError);
  }

  get(id): Promise<Vendor>{
  	return this.http.get(url+'Get/'+ id)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified vendor
  		.then(resp => resp.json() as Vendor)
  		.catch(this.handleError);
  }

  change(vendor: Vendor): Promise<any>{
  	// This function requires the vendor to be passed in, so we can change it
  		//Because we are making a change, just like when we use the Postman app,
  		//we need to use "post" instead of "get"
	return this.http.post(url+'Change', vendor)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified vendor
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }

  add(vendor: Vendor): Promise<any>{
  	return this.http.post(url+'Add', vendor)
  		.toPromise()
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }

  remove(vendor: Vendor): Promise<any>{
  	return this.http.post(url+'Remove', vendor)
  		.toPromise()
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