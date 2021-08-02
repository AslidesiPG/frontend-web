import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { DialogService } from '../dialog.service';
import { PromptComponent } from '../prompt/prompt.component';
@Directive({
    selector: '[dialog-prompt]'
})
export class PromptDirective {

    _option: any = {};
    data: any = {
        input_type: 'text',
        ok: 'Ok',
        cancel: 'Cancel',
    };

    @Input() set message(value) {
        this.data.message = value;
    }
    @Input() set title(value) {
        this.data.title = value;
    }

    @Input() set ok(value) {
        this.data.ok = value || 'Ok';
    }
    @Input() set cancel(value) {
        this.data.cancel = value || 'Cancel';
    }
    @Input() set placeholder(value) {
        this.data.placeholder = value;
    }
    @Input() set label(value) {
        this.data.label = value;
    }
    @Input() set inputType(value) {
        this.data.input_type = value || 'text';
    }

    @Input() set option(value) {
        this._option = value;
    }

    @Output() callback = new EventEmitter<any>();
    @Output() confirm = new EventEmitter<any>();

    constructor(private dialogService: DialogService) {

    }

    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
        // tslint:disable-next-line: variable-name
        const new_options = Object.assign({
            panelClass: ['modal-sm', 'dialog-modal', 'dialog-prompt'],
            data: this.data
        }, this._option);
        this.dialogService.dialogOpen(PromptComponent, new_options);

        this.dialogService.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.confirm.emit(result);
            }
            this.callback.emit(result);
        });
    }
}
