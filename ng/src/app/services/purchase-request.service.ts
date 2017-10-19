import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';

import { PurchaseRequest } from '../models/PurchaseRequest';

const urlBase = 'http://localhost:62140/';
const mvcCtrl = 'PurchaseRequests/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class PurchaseRequestService {

	private headers = new Headers({
		'Access-Control-Allow-Origin': '*', 
		'Accepts': 'application/json', 
		'Content-Type': 'application/json'
	});

  constructor(private http: Http) { }

	getForReview(): Promise<PurchaseRequest[]> {
		return this.http.get(url+'Review')
			.toPromise()
			.then(resp => resp.json() as PurchaseRequest[])
			.catch(this.handleError);	
	}

	list(): Promise<PurchaseRequest[]> {
		return this.http.get(url+'List')
			.toPromise()
			.then(resp => resp.json() as PurchaseRequest[])
			.catch(this.handleError);	
	}

	get(id): Promise<PurchaseRequest> {
		return this.http.get(url+'Get/'+id)
			.toPromise()
			.then(resp => resp.json() as PurchaseRequest)
			.catch(this.handleError);	
	}

	add(purchaseRequest: PurchaseRequest): Promise<any> {
		return this.http.post(url+'Add', purchaseRequest)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	change(purchaseRequest: PurchaseRequest): Promise<any> {
		return this.http.post(url+'Change', purchaseRequest)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	remove(purchaseRequest: PurchaseRequest): Promise<any> {
		return this.http.post(url+'Remove', purchaseRequest)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);	
	}
	private handleError(error: any): Promise<any> {
		console.error('An error has occurred', error);
		return Promise.reject(error.message || error);
	}	  

}
