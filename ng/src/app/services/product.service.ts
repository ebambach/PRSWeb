import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Product } from '../models/Product';

const urlBase = 'http://localhost:62140/';
const mvcCtrl = 'Products/';
const url: string = urlBase + mvcCtrl;

@Injectable()
export class ProductService {

	private headers = new Headers({
		'Access-Control-Allow-Origin': '*', 
		'Accepts': 'application/json', 
		'Content-Type': 'application/json'
	});

 constructor(private http: Http) { }

	list(): Promise<Product[]> {
		return this.http.get(url+'List')
			.toPromise()
			.then(resp => resp.json() as Product[])
			.catch(this.handleError);	
	}

	get(id): Promise<Product> {
		return this.http.get(url+'Get/'+id)
			.toPromise()
			.then(resp => resp.json() as Product)
			.catch(this.handleError);	
	}

	add(product: Product): Promise<any> {
		return this.http.post(url+'Add', product)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	change(product: Product): Promise<any> {
		return this.http.post(url+'Change', product)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);
	}

	remove(product: Product): Promise<any> {
		return this.http.post(url+'Remove', product)
			.toPromise()
			.then(resp => resp.json() || {})
			.catch(this.handleError);	
	}
	private handleError(error: any): Promise<any> {
		console.error('An error has occurred', error);
		return Promise.reject(error.message || error);
	}	  

}
