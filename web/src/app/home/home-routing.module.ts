import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from '../shared/resolver/page/page.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { slug: 'home' },
    resolve: { page: PageResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
