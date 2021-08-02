import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CustomComponent>) { }

    ngOnInit() {

    }

    callback(button) {
        if (button.callback !== undefined) {
            button.callback(this.dialogRef, this);
        }
        if (button.close !== false) {
            this.dialogRef.close();
        }
    }

}
