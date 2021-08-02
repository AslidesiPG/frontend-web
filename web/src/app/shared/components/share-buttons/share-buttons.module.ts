import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'ngx-sharebuttons';
import { MatButtonModule } from '@angular/material/button';
import { ShareButtonsComponent } from './share-buttons/share-buttons.component';


@NgModule({
  declarations: [ShareButtonsComponent],
  exports: [ShareButtonsComponent],
  imports: [
    CommonModule,
    ShareModule,
    MatButtonModule,
  ]
})
export class ShareButtonsModule { }
