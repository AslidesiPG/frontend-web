import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepComponent } from './checkout-step.component';

describe('CheckoutStepComponent', () => {
  let component: CheckoutStepComponent;
  let fixture: ComponentFixture<CheckoutStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
