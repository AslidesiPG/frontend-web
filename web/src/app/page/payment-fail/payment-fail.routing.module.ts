import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentFailComponent } from './payment-fail.component';



const routes: Routes = [
    {
        path: '',
        component: PaymentFailComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentFailRoutingModule { }
