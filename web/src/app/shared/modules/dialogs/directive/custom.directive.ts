import { Directive, Input, Output, HostListener, EventEmitter, TemplateRef } from '@angular/core';

import { DialogService } from '../dialog.service';
import { CustomComponent } from '../custom/custom.component';



export class Button {
    name = 'button';
    type = 'info';
    label = 'Submit';
    close = true;
    callback?: any = (any) => void (0);
}

@Directive({
    selector: '[dialog-custom]'
})
export class CustomDirective {
    _option: any = {};

    // _buttons:Array<Button>;

    dataStore: any = {
        input_type: 'text',
        size: 'md',
    };

    @Input() set template(value: TemplateRef<any>) {
        this.dataStore.template = value;
    }

    @Input() set buttons(value: Array<Button>) {
        this.dataStore.buttons = value;
    }
    @Input() set title(value) {
        this.dataStore.title = value;
    }

    @Input() set data(value) {
        this.dataStore = { ...this.dataStore, ...value };
    }

    @Input() set size(value) {
        this.dataStore.size = value;
    }

    @Output() callback = new EventEmitter<any>();

    constructor(private dialogService: DialogService) {

    }

    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
        let new_options = Object.assign({
            panelClass: ['modal-' + this.dataStore.size, 'dialog-modal', 'dialog-custom'],
            data: this.dataStore
        }, this._option);

        this.dialogService.dialogOpen(CustomComponent, new_options);
    }
}
