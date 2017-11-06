import { PurchaseRequest } from './PurchaseRequest';

export class PurchaseRequestLineItem {
	
	Id: number;
	ProductId: number;
	PurchaseRequest: PurchaseRequest;
	//PurchaseRequestId: number;
	Quantity: number;

	constructor(
		Id: number,
		ProductId: number,
		PurchaseRequest: PurchaseRequest,
		//PurchaseRequestId: number,
		Quantity: number
	) {
		this.Id = Id;
		this.ProductId = ProductId;
		this.PurchaseRequest = PurchaseRequest;
		//this.PurchaseRequestId = PurchaseRequestId;
		this.Quantity = Quantity;
	}
	
}