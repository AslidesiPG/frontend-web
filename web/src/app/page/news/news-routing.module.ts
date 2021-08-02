import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NewsResolver } from 'src/app/shared/resolver/news/news.resolver';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':slug',
    component: DetailsComponent,
    resolve: { news: NewsResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
