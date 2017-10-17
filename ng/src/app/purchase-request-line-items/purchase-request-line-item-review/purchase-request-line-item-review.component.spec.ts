import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestLineItemReviewComponent } from './purchase-request-line-item-review.component';

describe('PurchaseRequestLineItemReviewComponent', () => {
  let component: PurchaseRequestLineItemReviewComponent;
  let fixture: ComponentFixture<PurchaseRequestLineItemReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestLineItemReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestLineItemReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});