import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-riesgos-mantenedor',
  templateUrl: './dialog-riesgos-mantenedor.component.html',
  styleUrls: ['./dialog-riesgos-mantenedor.component.css']
})
export class DialogRiesgosMantenedorComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DialogRiesgosMantenedorComponent>)  { }

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit() 
  {
  }

}
