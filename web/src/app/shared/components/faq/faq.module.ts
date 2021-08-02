import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [FaqComponent],
  exports: [FaqComponent],
  entryComponents: [FaqComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
  ]
})
export class FaqModule { }
