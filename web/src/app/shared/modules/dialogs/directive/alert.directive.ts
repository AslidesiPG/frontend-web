// tslint:disable: variable-name
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { DialogService } from '../dialog.service';
import { AlertComponent } from '../alert/alert.component';

@Directive({
    selector: '[dialog-alert]'
})
export class AlertDirective {
    _option: any = {};
    data: any = {
        title: 'Alert',
        ok: 'Ok',
    };

    @Input() set message(value) {
        this.data.message = value;
    }
    @Input() set title(value) {
        this.data.title = value || 'Alert';
    }
    @Input() set ok(value) {
        this.data.ok = value || 'Ok';
    }
    @Input() set option(value) {
        this._option = value;
    }

    @Output() callback = new EventEmitter<any>();

    constructor(private dialogService: DialogService) {

    }


    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
        const new_options = Object.assign({
            panelClass: ['modal-sm', 'dialog-modal', 'dialog-alert'],
            data: this.data
        }, this._option);
        this.dialogService.dialogOpen(AlertComponent, new_options);


        this.dialogService.dialogRef.afterClosed().subscribe(result => {
            // let confirm = result ? true : false;
            this.callback.emit();
        });
    }
}
