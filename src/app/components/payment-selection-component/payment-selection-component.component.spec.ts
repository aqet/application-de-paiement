import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSelectionComponentComponent } from './payment-selection-component.component';

describe('PaymentSelectionComponentComponent', () => {
  let component: PaymentSelectionComponentComponent;
  let fixture: ComponentFixture<PaymentSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSelectionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
