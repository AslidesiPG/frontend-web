import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { MatButtonModule } from '@angular/material/button';
import { ShareButtonsModule } from 'src/app/shared/components/share-buttons/share-buttons.module';


@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    MatButtonModule,
    ShareButtonsModule,
  ]
})
export class NewsModule { }
