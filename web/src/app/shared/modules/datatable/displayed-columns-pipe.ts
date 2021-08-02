import { Pipe, PipeTransform } from '@angular/core';
import { ColumnComponent } from './column/column.component';

@Pipe({
    name: 'displayedColumns'
})
export class DisplayedColumnsPipe implements PipeTransform {
    transform(cols: Array<ColumnComponent>, prepend: any = []): Array<string> {
        if (cols === undefined) {
            return [];
        }
        const displayedColumns = [];
        cols.forEach((col: ColumnComponent) => {
            displayedColumns.push(col.field);
        });
        if (typeof prepend !== 'object') {
            prepend = [prepend];
        }
        return prepend.concat(displayedColumns);
    }
}
