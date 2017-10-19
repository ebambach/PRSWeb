export class PurchaseRequest {
	
	Id: number;
	Description: string;
	Justification: string;
	RejectionReason: string;
	DeliveryMode: string;
	DateNeeded: Date;
	DateSubmitted: Date;
	Status: string;
	Total: number;
	UserId: number;

	constructor(
		Id: number,
		Description: string,
		Justification: string,
		RejectionReason: string,
		DeliveryMode: string,
		DateNeeded: Date,
		DateSubmitted: Date,
		Status: string,
		Total: number,
		UserId: number
	) {
		this.Id = Id;
		this.Description = Description;
		this.Justification = Justification;
		this.RejectionReason = RejectionReason;
		this.DeliveryMode = DeliveryMode;
		this.DateNeeded = DateNeeded;
		this.DateSubmitted = DateSubmitted;
		this.Status = Status;
		this.Total = Total;
		this.UserId = UserId;
	}
}