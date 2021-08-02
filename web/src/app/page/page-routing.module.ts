import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('src/app/page/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('src/app/page/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'how-to-buy',
    loadChildren: () => import('src/app/page/how-to-buy/how-to-buy.module').then((m) => m.HowToBuyModule),
  },
  {
    path: 'how-to-sell',
    loadChildren: () => import('src/app/page/how-to-sell/how-to-sell.module').then((m) => m.HowToSellModule),
  },
  {
    path: '',
    loadChildren: () => import('src/app/page/default/default.module').then((m) => m.DefaultModule),
  },
  {
    path: '*',
    loadChildren: () => import('src/app/page/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
