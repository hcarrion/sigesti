import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaFire } from 'src/app/shared/models/iniciativa-fire';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseParametroService } from 'src/app/shared/services/firebase-parametro.service';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaService } from 'src/app/shared/services/firebase-iniciativa.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-registro-contacto',
  templateUrl: './registro-contacto.component.html',
  styleUrls: ['./registro-contacto.component.css']
})
export class RegistroContactoComponent implements OnInit {
  regContacto: FormGroup;
  iniciativa: IniciativaFire = new IniciativaFire();
  constructor(public dialogRef: MatDialogRef<RegistroContactoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.iniciativa = data;
      this.regContacto = new FormGroup({
        tituloInputDialog: new FormControl(),
        nIniciativaInputDialog: new FormControl()
      });
  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.regContacto.controls.tituloInputDialog.setValue(this.iniciativa.titulo);
    this.regContacto.controls.nIniciativaInputDialog.setValue(this.iniciativa.numeroIniciativa);
  }

}
