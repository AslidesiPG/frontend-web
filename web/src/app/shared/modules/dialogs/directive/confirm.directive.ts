import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { DialogService } from '../dialog.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Directive({
    selector: '[dialog-confirm]'
})
export class ConfirmDirective {

    _option: any = {};
    data: any = {
        yes: 'Yes',
        no: 'No',
        title: 'Confirm',
    };

    @Input() set message(value) {
        this.data.message = value;
    }
    @Input() set title(value) {
        this.data.title = value || 'Confirm';
    }

    @Input() set yes(value) {
        this.data.yes = value || 'Yes';
    }
    @Input() set no(value) {
        this.data.no = value || 'No';
    }

    @Input() set option(value) {
        this._option = value;
    }

    @Output() callback = new EventEmitter<any>();
    @Output() confirm = new EventEmitter<any>();
    @Output() decline = new EventEmitter<any>();

    constructor(private dialogService: DialogService) {

    }


    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
        this.data.callback = (result) => {
            const confirm = result ? true : false;
            if (confirm) {
                this.confirm.emit();
            } else {
                this.decline.emit();
            }
            this.callback.emit(confirm);
        };

        // tslint:disable-next-line: variable-name
        const new_options = Object.assign({
            panelClass: ['modal-sm', 'dialog-modal', 'dialog-confirm'],
            data: this.data
        }, this._option);
        this.dialogService.dialogOpen(ConfirmComponent, new_options);
    }

}
