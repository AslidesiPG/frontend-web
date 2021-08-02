import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from 'src/app/shared/resolver/page/page.resolver';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';

const routes: Routes = [
  {
    path: '',
    component: HowToSellComponent,
    data: { slug: 'how-to-sell' },
    resolve: { page: PageResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowToSellRoutingModule { }
