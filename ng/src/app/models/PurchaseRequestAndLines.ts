import { PurchaseRequest } from './PurchaseRequest';
import { PurchaseRequestLineItem } from './PurchaseRequestLineItem';

export class PurchaseRequestAndLines{
	PurchaseRequest: PurchaseRequest;
	PurchaseRequestLineItems: PurchaseRequestLineItem[];
}