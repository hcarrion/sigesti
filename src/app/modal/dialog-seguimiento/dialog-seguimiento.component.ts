import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-seguimiento',
  templateUrl: './dialog-seguimiento.component.html',
  styleUrls: ['./dialog-seguimiento.component.css']
})
export class DialogSeguimientoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogSeguimientoComponent>, 
    private MatDialog: MatDialog) {}

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
