import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-step',
  templateUrl: './checkout-step.component.html',
  styleUrls: ['./checkout-step.component.scss']
})

export class CheckoutStepComponent implements OnInit {
 
  @Input() activeStep: string;

  constructor() { }

  ngOnInit(): void {
  }


}
