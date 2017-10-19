export class Product {
	
	Id: number;
	VendorPartNumber: string;
	Name: string;
	Price: number;
	Unit: string;
	PhotoPath: string;
	VendorId: number;

	constructor(	
		Id: number,
		VendorPartNumber: string,
		Name: string,
		Price: number,
		Unit: string,
		PhotoPath: string,
		VendorId: number
	) {
		this.Id = Id;
		this.VendorPartNumber = VendorPartNumber;
		this.Name = Name;
		this.Price = Price;
		this.Unit = Unit;
		this.PhotoPath = PhotoPath;
		this.VendorId = VendorId;
	}

}