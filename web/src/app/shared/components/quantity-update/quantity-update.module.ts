import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityUpdateComponent } from './quantity-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [QuantityUpdateComponent],
  exports: [QuantityUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class QuantityUpdateModule { }
