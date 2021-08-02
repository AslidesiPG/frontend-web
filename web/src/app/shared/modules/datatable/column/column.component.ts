import { Component, OnInit, Input, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { BodyTemplate } from './body-template';

@Component({
    selector: 'column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, AfterContentInit {
    private _header: string;
    private _field: string;


    @Input() width: string = null;
    @Input() column: string;

    @Input()
    public get field(): string {
        return this._field;
    }
    public set field(value: string) {
        if (this.column === undefined) {
            this.column = value;
        }
        this._field = value;
    }

    @Input()
    public get header(): string {
        return this._header;
    }
    public set header(value: string) {

        if (this.field === undefined) {
            this.field = value;
        }

        this._header = value;
    }

    @Input() sortable = true;
    @Input() searchable = true;
    @Input() dataType = 'default';

    @ContentChildren(BodyTemplate) templates: QueryList<any>;

    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;

    ngOnInit(): void {

    }
    ngAfterContentInit(): void {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                default:
                    this.bodyTemplate = item.template;
                    break;
            }
        });

    }

}
