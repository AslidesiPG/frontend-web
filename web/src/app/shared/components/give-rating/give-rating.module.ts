import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiveRatingComponent } from './give-rating/give-rating.component';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpMessageModule } from '../../modules/http-message/http-message.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { StarRatingModule } from '../star-rating/star-rating.module';



@NgModule({
  declarations: [GiveRatingComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpMessageModule,
    MatIconModule,
    MatDividerModule,
    StarRatingModule,
  ]
})
export class GiveRatingModule { }
