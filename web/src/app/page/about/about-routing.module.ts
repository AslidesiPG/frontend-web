import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from 'src/app/shared/resolver/page/page.resolver';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { slug: 'about-us' },
    resolve: { page: PageResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
