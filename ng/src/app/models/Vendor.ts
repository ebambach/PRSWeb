export class Vendor{

	Id: number;
	Code: string;
	Name: string;
	Address: number;
	City: string;
	State: string;
	Zip: number;
	Phone: string;
	Email: string;
	PreApproved: boolean;

	constructor(
		Id: number,
		Code: string,
		Name: string,
		Address: number,
		City: string,
		State: string,
		Zip: number,
		Phone: string,
		Email: string,
		PreApproved: boolean
	){
		this.Id = Id;
		this.Code = Code;
		this.Name = Name;
		this.Address = Address;
		this.City = City;
		this.State = State;
		this.Zip = Zip;
		this.Phone = Phone;
		this.Email = Email;
		this.PreApproved = PreApproved;
	}
}