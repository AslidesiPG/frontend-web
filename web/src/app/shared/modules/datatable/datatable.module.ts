import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { ColumnComponent } from './column/column.component';
import { BodyTemplate } from './column/body-template';
// tslint:disable-next-line: max-line-length
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisplayedColumnsPipe } from './displayed-columns-pipe';
import { from } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [DatatableComponent, ColumnComponent, BodyTemplate, DisplayedColumnsPipe],
  exports: [DatatableComponent, ColumnComponent, BodyTemplate]
})
export class DatatableModule { }
