import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import {PurchaseRequest} from '../models/PurchaseRequest';

//Because we will reuse the address information, we'll set it
//up here as a set of variables
const urlBase = "http://localhost:62140/";
const mvcCtrl = 'PurchaseRequests/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class PurchaseRequestService {

 constructor(private http: Http) { }

  list():Promise<PurchaseRequest[]>{
  	return this.http.get(url+'List')
  		.toPromise()
  		//This .then returns a list of the users
  		.then(resp => resp.json() as PurchaseRequest[])
  		.catch(this.handleError);
  }

  get(id): Promise<PurchaseRequest>{
  	return this.http.get(url+'Get/'+ id)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified purchaserequest
  		.then(resp => resp.json() as PurchaseRequest)
  		.catch(this.handleError);
  }

  change(purchaserequest: PurchaseRequest): Promise<any>{
  	// This function requires the purchaserequest to be passed in, so we can change it
  		//Because we are making a change, just like when we use the Postman app,
  		//we need to use "post" instead of "get"
	return this.http.post(url+'Change', purchaserequest)
  		.toPromise()
  		//The .then determines what a Promise returns, in this case, a specified purchaserequest
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }

  add(purchaserequest: PurchaseRequest): Promise<any>{
  	return this.http.post(url+'Add', purchaserequest)
  		.toPromise()
  		.then(resp => resp.json() || {})
  		.catch(this.handleError);
  }

  // remove(purchaserequest: PurchaseRequest): Promise<any>{
  // 	return this.http.post(url+'Remove', purchaserequest)
  // 		.toPromise()
  // 		.then(resp => resp.json() || {})
  // 		.catch(this.handleError);
  // }
  
  //This private function takes a parameter called error, of type
  //any (a generic type, because we don't know what it could be).
  	//The return type is a Promise, also of type any.
  private handleError(error:any):Promise<any>{
  		console.error('An error has occurred', error);
  		//When the Promise fails, it sends the error message.
  		return Promise.reject(error.message || error);
  }
}