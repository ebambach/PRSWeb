import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestLineItemAddComponent } from './purchase-request-line-item-add.component';

describe('PurchaseRequestLineItemAddComponent', () => {
  let component: PurchaseRequestLineItemAddComponent;
  let fixture: ComponentFixture<PurchaseRequestLineItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestLineItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestLineItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
