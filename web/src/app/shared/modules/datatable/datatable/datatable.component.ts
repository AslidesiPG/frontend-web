// tslint:disable: variable-name
import { Component, OnInit, Input, ContentChildren, QueryList, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
import { SelectionModel } from '@angular/cdk/collections';

import { merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, map, debounceTime } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

export interface FilterColumn {
    name: string;
    type: string;
}

@Component({
    selector: 'datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, AfterViewInit {
    private _value: any[] | Observable<any[]> = [];

    resultsLength = 0;
    isLoadingResults = false;
    displayNoRecords = false;
    isRateLimitReached = false;

    _this: DatatableComponent;

    selection = new SelectionModel<PeriodicElement>(true, []);
    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<any>;

    datatable_refresh: Subject<any> = new Subject();
    filter: Subject<any> = new Subject();
    filter_value: string;
    filter_in: Array<FilterColumn> = [];
    cols_data: any = {};

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ContentChildren(ColumnComponent) cols: ColumnComponent[];

    @Output() bulkAction: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output() rowClick: EventEmitter<any[]> = new EventEmitter<any[]>();

    // tslint:disable-next-line: ban-types
    dataApi: Function | null;
    noRecordsfound: boolean;

    @Input() defaultSort = null;
    @Input() defaultSortDir = 'asc';
    @Input() allowFilter = true;
    @Input() select: any = false;

    @Input() get value(): any {
        return this._value;
    }
    set value(val: any) {
        if (val instanceof Function) {
            this.dataSource = new MatTableDataSource([]);
            this.dataApi = val;
        } else {
            this.dataApi = null;
            this._value = val ? [...val] : [];
            this.dataSource = new MatTableDataSource(this._value);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.resultsLength = this._value.length;
        }
    }

    @Input() rowClass = (row) => '';

    constructor() {
        this._this = this;
    }

    onRowClick(row) {
        this.rowClick.emit(row);
    }
    ngOnInit() {
        if (this.dataApi) {
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


            merge(this.sort.sortChange, this.datatable_refresh, this.paginator.page, this.filter.pipe(debounceTime(500)))
                .pipe(
                    startWith({}),
                    switchMap(() => {
                        this.isLoadingResults = true;
                        const request_data: any = {
                            page: this.paginator.pageIndex + 1,
                            limit: this.paginator.pageSize || 10,
                            datatable: true,
                        };

                        if (this.sort.active) {
                            const order_col = this.cols_data[this.sort.active];

                            request_data.order = {
                                direction: this.sort.direction ? this.sort.direction : 'asc',
                                name: order_col.column,
                                type: order_col.dataType
                            };

                        }
                        if (this.filter_value) {
                            request_data.filter_in = this.filter_in;
                            request_data.filter = this.filter_value;
                        }
                        return this.dataApi(request_data);
                    }),
                    map((data: any) => {
                        this.isLoadingResults = false;
                        this.isRateLimitReached = false;
                        if (data.length !== undefined) {
                            this.resultsLength = data.length;
                        } else {
                            this.resultsLength = data.total || data.meta.total;
                        }
                        return data.data;
                    }),
                    /* catchError(() => {
                        this.isLoadingResults = false;
                        this.isRateLimitReached = true;
                        return of([]);
                    }) */
                )
                .subscribe((data: any) => {
                    this.dataSource = data;
                    // if (this.dataSource.filteredData && this.dataSource.filteredData.length == 0){
                    if (data.length === 0) {
                        this.noRecordsfound = true;
                    } else {
                        this.noRecordsfound = false;
                    }
                    // }
                });
        } else {
            this.resultsLength = this.value.length;
            // if (this.dataSource.filteredData && this.dataSource.filteredData.length == 0) {
            if (this.value.length === 0) {
                this.noRecordsfound = true;
            } else {
                this.noRecordsfound = false;
            }
            // }
        }


        this.dataSource.filterPredicate = (data, filter: string): boolean => {
            const searchable = this.getSearchableColumns();

            for (const col of searchable) {
                if (data[col.field] !== undefined && data[col.field].toLowerCase().includes(filter.toLowerCase())) {
                    return true;
                }
            }
        };
    }

    ngAfterViewInit() {
        this.filter_in = [];
        this.cols_data = {};

        this.cols.forEach((col) => {
            this.cols_data[col.field] = { field: col.field, dataType: col.dataType, header: col.header, column: col.column };
        });

        const searchable = this.getSearchableColumns();
        for (const col of searchable) {
            this.filter_in.push({ name: col.column, type: col.dataType });
        }

    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.value.length;
        return numSelected === numRows;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.filter_value = this.dataSource.filter;
        this.filter.next(this.dataSource.filter);

        if (this.dataSource.filteredData && this.dataSource.filteredData.length === 0) {
            this.displayNoRecords = true;
        } else {
            this.displayNoRecords = false;
        }
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.value.forEach(row => this.selection.select(row));
    }


    getSearchableColumns(): Array<ColumnComponent> {
        return this.cols.filter(col => col.searchable);
    }

    refresh() {
        this.datatable_refresh.next({});
    }
}
