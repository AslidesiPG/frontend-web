import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
    input: any;

    @Input() label = '';
    @Input() placeholder = '';
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<PromptComponent>,
        private fb: FormBuilder,
    ) {
        this.form = this.fb.group({
            input: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.get('input').value);
        }
    }

}
