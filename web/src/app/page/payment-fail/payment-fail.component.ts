import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-payment-fail',
    templateUrl: './payment-fail.component.html',
    styleUrls: ['./payment-fail.component.scss']
})

export class PaymentFailComponent implements OnInit {
    ngOnInit() {

    }
    constructor(
        private router: Router
    ){}

    onGotoCart() {
        this.router.navigateByUrl('cart');
    }
}