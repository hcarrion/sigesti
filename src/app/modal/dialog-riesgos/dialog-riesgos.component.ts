import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRiesgosMantenedorComponent } from './dialog-riesgos-mantenedor/dialog-riesgos-mantenedor.component';

@Component({
  selector: 'app-dialog-riesgos',
  templateUrl: './dialog-riesgos.component.html',
  styleUrls: ['./dialog-riesgos.component.css']
})
export class DialogRiesgosComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogRiesgosComponent>, 
    private MatDialog: MatDialog) { }

  close(): void {
    this.dialogRef.close();
  }

  openMantenedor()
  {
    const dialogConfig = new MatDialogConfig();
    this.MatDialog.open(DialogRiesgosMantenedorComponent, /*dialogConfig,*/
      { 
        width: '1000px',
        height: '735px'
      }
      );
  }

  ngOnInit() {
  }

}
