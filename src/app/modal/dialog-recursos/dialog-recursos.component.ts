import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaFire } from 'src/app/shared/models/iniciativa-fire';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-recursos',
  templateUrl: './dialog-recursos.component.html',
  styleUrls: ['./dialog-recursos.component.css']
})
export class DialogRecursosComponent implements OnInit {
  regRecursos: FormGroup;
  iniciativa: IniciativaFire = new IniciativaFire();
  constructor(public dialogRef: MatDialogRef<DialogRecursosComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.iniciativa = data;
      this.regRecursos = new FormGroup({
        tituloInputDialog: new FormControl()
      });

  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.regRecursos.controls.tituloInputDialog.setValue(this.iniciativa.titulo);
  }

}
