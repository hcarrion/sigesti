import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-recursos',
  templateUrl: './dialog-recursos.component.html',
  styleUrls: ['./dialog-recursos.component.css']
})
export class DialogRecursosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRecursosComponent>) {

  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() 
  {
  }

}
