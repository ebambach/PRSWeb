export class PurchaseRequest{

	Id: number;
	Description: string;
	Justification: string;
	DateNeeded: Date;
	DeliveryMode: string;
	Status: string;
	Total: number;
	SubmittedDate: Date;
	UserId: number;

	constructor(
		Id: number,
		Description: string,
		Justification: string,
		DateNeeded: Date,
		DeliveryMode: string,
		Status: string,
		Total: number,
		SubmittedDate: Date,
		UserId: number,
	){
		this.Id = Id;
		this.Description = Description;
		this.Justification = Justification;
		this.DateNeeded = DateNeeded;
		this.DeliveryMode = DeliveryMode;
		this.Status = Status;
		this.Total = Total;
		this.SubmittedDate = SubmittedDate;
		this.UserId = UserId;
	}
}