import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { FirebaseIniciativaService } from '../shared/services/firebase-iniciativa.service';
import { IniciativaFire } from '../shared/models/iniciativa-fire';

@Component({
  selector: 'app-listado-atencion',
  templateUrl: './listado-atencion.component.html',
  styleUrls: ['./listado-atencion.component.css']
})
export class ListadoAtencionComponent implements OnInit 
{

  title = "Example Angular 8 Material Dialog";
  iniciativas: IniciativaFire[] = [];
  constructor(private matDialog: MatDialog, private firebaseIniciativas: FirebaseIniciativaService) {}

  openDialog() 
  {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogRecursosComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px'
      }
      );
  }

  openDialog2()
  {
    this.matDialog.open(DialogRiesgosComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px'
      }
      );
  }
  openDialog3()
  {
    this.matDialog.open(DialogSeguimientoComponent, /*dialogConfig,*/
    
      { width: '1200px',
        height: '600px'
      }
      );
  }
  onCloseHandled()
  {
 
  }

  ngOnInit() {
    this.callIniciativas();
  }

  async callIniciativas() {
    let iniciativasRef = this.firebaseIniciativas.getIniciativas();
    iniciativasRef.subscribe(data => {
      this.iniciativas = []
      data.forEach(iniciativaObj => {
        let iniciativaObject= iniciativaObj.payload.doc.data() as IniciativaFire;
        this.iniciativas.push(iniciativaObject);
      });
    });
  }

}
