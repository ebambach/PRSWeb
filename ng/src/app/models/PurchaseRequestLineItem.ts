import {PurchaseRequest} from './PurchaseRequest';
import {Product} from './Product';

export class PurchaseRequestLineItem{

	Id: number;
	Quantity: number;
	PurchaseRequestId: number;
	PurchaseRequest: PurchaseRequest;
	ProductId: number;
	Product: Product;

	constructor(
		Id: number,
		Quantity: number,
		PurchaseRequestId: number,
		PurchaseRequest: PurchaseRequest,
		ProductId: number,
		Product: Product
	){
		this.Id = Id;
		this.Quantity = Quantity;
		this.PurchaseRequestId = PurchaseRequestId;
		this.PurchaseRequest = PurchaseRequest;
		this.ProductId = ProductId;
		this.Product = Product;
	}
}