// tslint:disable: variable-name
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public dialogRef: any;
  constructor(
    private dialog: MatDialog
  ) { }

  dialogOpen(component: any, option: any = {}) {
    const new_options = Object.assign({
      panelClass: 'dialog-md modal-md',
      data: {}
    }, option);
    this.dialogRef = this.dialog.open(component, new_options);
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
}
