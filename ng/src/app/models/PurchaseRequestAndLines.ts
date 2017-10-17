import { PurchaseRequest } from './PurchaseRequest';
import { PurchaseRequestLineItem } from './PurchaseRequestLineItem';

export class PurchaseRequestAndLines{
	PurchaseRequest: PurchaseRequest;
	PurchaseRequestLinesItems: PurchaseRequestLinesItem[];
}