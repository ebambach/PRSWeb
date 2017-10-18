import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PurchaseRequestLineItem } from '../models/PurchaseRequestLineItem';
import { PurchaseRequestAndLines } from '../models/PurchaseRequestAndLines';

const urlBase = 'http://localhost:62140/';
const mvcCtrl = 'PurchaseRequestLineItems/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class PurchaseRequestLineItemService {

	private headers = new Headers({
		'Access-Control-Allow-Origin': '*', 
		'Accepts': 'application/json', 
		'Content-Type': 'application/json'
	});

  constructor(private http: Http) { }

  	getById(id): Promise<PurchaseRequestAndLines> {
  		return this.http.get(url+'GetById/'+id)
  			.toPromise()
  			.then(resp => resp.json() as PurchaseRequestAndLines)
  			.catch(this.handleError);
  	}

	list(): Promise<PurchaseRequestLineItem[]> {
		return this.http.get(url+'List')
			.toPromise()
			.then(resp => resp.json() as PurchaseRequestLineItem[])
			.catch(this.handleError);	
	}

	get(id): Promise<PurchaseRequestLineItem> {
		return this.http.get(url+'Get/'+id)
			.toPromise()
			.then(resp => resp.json() as PurchaseRequestLineItem)
			.catch(this.handleError);	
	}

	add(purchaseRequest: PurchaseRequestLineItem): Promise<any> {
		return this.http.post(url+'Add', purchaseRequest)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	change(purchaseRequest: PurchaseRequestLineItem): Promise<any> {
		return this.http.post(url+'Change', purchaseRequest)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	remove(purchaseRequest: PurchaseRequestLineItem): Promise<any> {
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