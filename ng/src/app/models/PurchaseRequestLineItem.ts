export class PurchaseRequestLineItem {
	
	Id: number;
	ProductId: number;
	PurchaseRequestId: number;
	Quantity: number;

	constructor(
		Id: number,
		ProductId: number,
		PurchaseRequestId: number,
		Quantity: number
	) {
		this.Id = Id;
		this.ProductId = ProductId;
		this.PurchaseRequestId = PurchaseRequestId;
		this.Quantity = Quantity;
	}
	
}