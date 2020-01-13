import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';

@Component({
  selector: 'app-listado-atencion',
  templateUrl: './listado-atencion.component.html',
  styleUrls: ['./listado-atencion.component.css']
})
export class ListadoAtencionComponent implements OnInit 
{

  title = "Example Angular 8 Material Dialog";

  constructor(private matDialog: MatDialog) {}

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

  onCloseHandled()
  {
 
  }

  ngOnInit() {
   
    
  }

  

}
