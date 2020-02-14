import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogRecursosComponent } from '../modal/dialog-recursos/dialog-recursos.component';
import { DialogRiesgosComponent } from '../modal/dialog-riesgos/dialog-riesgos.component';
import { DialogSeguimientoComponent} from "../modal/dialog-seguimiento/dialog-seguimiento.component";
import { DialogRegistraSeguimientoComponent } from '../modal/dialog-registra-seguimiento/dialog-registra-seguimiento.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogRegistraContactoComponent } from '../modal/dialog-registra-contacto/dialog-registra-contacto.component';
import { FirebaseContactoService } from '../shared/services/firebase-contacto.service';
import { ContactoFire } from '../shared/models/contacto-fire';


@Component({
  selector: 'app-registro-contacto',
  templateUrl: './registro-contacto.component.html',
  styleUrls: ['./registro-contacto.component.css']
})
export class RegistroContactoComponent implements OnInit {habilitar: boolean;
  selected: boolean;
  nuevo: boolean;
  edit: boolean;
  delete: boolean;
  tabla: any;
  mensajeAccion: string;
  display: boolean = false;
  columnasTabla: string[] = ['codigo', 'nombres','cargo','telefono','correo','estado','accion'];
  contactos= new MatTableDataSource<ContactoFire>([]);
  selectedRowIndex: number = -1;
  tipoDocumentoData = new MatTableDataSource<ContactoFire>([]);
  tipoDocumentoDataBuscar = new MatTableDataSource<ContactoFire>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public tipoDocumento: ContactoFire[];
  public tipoDocumentoSeleccionado: ContactoFire;
  
  loading: boolean;
  constructor(private matDialog: MatDialog, private firebaseContactos: FirebaseContactoService) {}

  openDialogEdit(contacto: ContactoFire) {
    this.matDialog.open(DialogRegistraContactoComponent, /*dialogConfig,*/
      { width: '1200px',
        height: '600px',
        data: contacto
      }
    );
  }

  openDialogNew(){
    this.matDialog.open(DialogRegistraContactoComponent, /*dialogConfig,*/
      { width: '2000px',
        height: '600px',
        data: new ContactoFire()
      }
    );
  }

  onCloseHandled()
  {
 
  }

  ngOnInit() {
    localStorage.setItem('indinicio',"false");   
    this.callContactos();
  }

  async callContactos() {
    this.loading = true;
    let contactosRef = this.firebaseContactos.getContactos();
    contactosRef.subscribe(data => {
      var lista = [];
      for(var i = 0; i < data.length; i++){
        let contactoObject= data[i].payload.doc.data() as ContactoFire;
        let idContacto = data[i].payload.doc.id;
        contactoObject.idContacto = idContacto;
        lista.push(contactoObject);
      }
      this.contactos =  new MatTableDataSource(lista);
      this.contactos.paginator = this.paginator;
      this.contactos.sort = this.sort;
      this.InicializaDatosBusqueda();
      this.loading = false;
    });
  }

  InicializaDatosBusqueda(){
     // Inicializa los datos de busqueda
     this.contactos.filterPredicate = (data, filter) => {
      const dataStr = data.codigo + data.nombres + data.cargo.descripcion + data.telefono  + data.correo + data.estado.descripcion;
      return dataStr.toLowerCase().indexOf(filter) != -1;       
    }
  }

  buscarDatos(filterValue: string) {
    this.contactos.filter = filterValue.trim().toLowerCase();
  }

  buscarDatosHelp(filterValue: string) {
    this.contactos.filter = filterValue.trim();
  }

  highlight(row){
    this.selectedRowIndex = row.codigo;
  }

  selectedDocumento(todo: ContactoFire) {
    this.InReset();
    this.habilitar = true;
    this.selected = true;
    this.delete = true;
    this.nuevo = false;
    this.edit = false;
    this.tipoDocumentoSeleccionado = todo;
  }

  InReset() {
    this.habilitar = false;
    this.nuevo = false;
    this.edit = false;
    this.delete = false;
    this.selected = false;
    this.display = false;
  }

 
}
