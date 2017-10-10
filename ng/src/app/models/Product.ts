import {Vendor} from './Vendor';

export class Product{

	Id: number;
	VendorPartNumber: string;
	Name: string;
	Price: number;
	Unit: string;
	Photopath: string;
	VendorId: number;
	Vendor: Vendor;

	constructor(
		Id: number,
		VendorPartNumber: string,
		Name: string,
		Price: number,
		Unit: string,
		Photopath: string,
		VendorId: number,
		Vendor: Vendor
	){
		this.Id = Id;
		this.VendorPartNumber = VendorPartNumber;
		this.Name = Name;
		this.Price = Price;
		this.Unit = Unit;
		this.Photopath = Photopath;
		this.VendorId = VendorId;
		this.Vendor = Vendor;
	}
}
