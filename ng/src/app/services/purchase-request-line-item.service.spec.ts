import { TestBed, inject } from '@angular/core/testing';

import { PurchaseRequestLineItemService } from './purchase-request-line-item.service';

describe('PurchaseRequestLineItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseRequestLineItemService]
    });
  });

  it('should be created', inject([PurchaseRequestLineItemService], (service: PurchaseRequestLineItemService) => {
    expect(service).toBeTruthy();
  }));
});
