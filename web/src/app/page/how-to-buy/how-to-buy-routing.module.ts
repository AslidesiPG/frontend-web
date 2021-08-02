import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from 'src/app/shared/resolver/page/page.resolver';
import {HowToBuyComponent} from './how-to-buy/how-to-buy.component'


const routes: Routes = [
  {
    path: '',
    component: HowToBuyComponent,
    data: { slug: 'how-to-buy' },
    resolve: { page: PageResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HowToBuyRoutingModule { }
