
export class PurchaseRequestLineItem{

	Id: number;
	Quantity: number;
	PurchaseRequestId: number;
	ProductId: number;

	constructor(
		Id: number,
		Quantity: number,
		PurchaseRequestId: number,
		ProductId: number,
	){
		this.Id = Id;
		this.Quantity = Quantity;
		this.PurchaseRequestId = PurchaseRequestId;
		this.ProductId = ProductId;
	}
}