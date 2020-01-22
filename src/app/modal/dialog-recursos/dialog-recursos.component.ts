import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaFire } from 'src/app/shared/models/iniciativa-fire';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseParametroService } from 'src/app/shared/services/firebase-parametro.service';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaService } from 'src/app/shared/services/firebase-iniciativa.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-dialog-recursos',
  templateUrl: './dialog-recursos.component.html',
  styleUrls: ['./dialog-recursos.component.css']
})
export class DialogRecursosComponent implements OnInit {
  regRecursos: FormGroup;
  iniciativa: IniciativaFire = new IniciativaFire();

  constructor(public dialogRef: MatDialogRef<DialogRecursosComponent>, private _ngZone: NgZone, private firestoreService: FirestoreService, 
    private firebaseParametros: FirebaseParametroService, 
    private firebaseColaboradores: FirebaseColaboradorService, 
    private firebaseIniciativas: FirebaseIniciativaService) {
    this.regRecursos = new FormGroup({
      estadoSelect: new FormControl(),
      tipoSelect: new FormControl(),
      clasificacionSelect: new FormControl(),
      categoriaSelect: new FormControl(),
      prioridadSelect: new FormControl(),
      areaSelect: new FormControl(),
      jefeProyectoSelect: new FormControl(),
      numIniciativaInput: new FormControl(),
      tituloInput: new FormControl(),
      sumillaInput: new FormControl(),
      usuarioProcesosSelect: new FormControl(),
      objPrincipalTextArea: new FormControl(),
      objSecundarioTextArea: new FormControl(),
      fechaInicioInput: new FormControl(),
      horaEstimadaInput: new FormControl(),
      fechaFinInput: new FormControl()
      });

  }

  close(): void {
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.regRecursos.controls.tituloInputDialog.setValue(this.iniciativa.titulo);
    this.regRecursos.controls.nIniciativaInputDialog.setValue(this.iniciativa.numeroIniciativa);
  }

}
