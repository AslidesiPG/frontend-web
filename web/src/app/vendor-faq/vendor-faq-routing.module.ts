import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorFaqComponent } from './vendor-faq/vendor-faq.component';

const routes: Routes = [
  {
    path: '',
    component:VendorFaqComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorFaqRoutingModule { }
