import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesComponent } from './attributes/attributes.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [AttributesComponent],
  exports: [AttributesComponent],
  entryComponents: [AttributesComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class AttributesModule { }
