import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from 'src/app/shared/resolver/page/page.resolver';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
  {
    path: ':slug',
    component: DefaultComponent,
    resolve: { page: PageResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
