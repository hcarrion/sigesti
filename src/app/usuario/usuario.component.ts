import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ColaboradorDetalleFire } from '../shared/models/colaborador-detalle-fire';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { UsuarioPerfilFireService } from '../shared/models/usuario-perfil-fire.service';
import { FirebaseColaboradorService } from '../shared/services/firebase-colaborador.service';
import { ColaboradorFire } from '../shared/models/colaborador-fire';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
 
  columnasTabla: string[] = ['codigo','usuario', 'nombre','cargo','perfil','accion'];
  //iniciativas: IniciativaFire[] = [];
  colaborador= new MatTableDataSource<UsuarioPerfilFireService>([]);
  selectedRowIndex: number = -1;
  public tipoDocumento: UsuarioPerfilFireService[];
  public tipoDocumentoSeleccionado: UsuarioPerfilFireService;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  loading: boolean;

  constructor(private matDialog: MatDialog, 
    private colaboradores: FirebaseColaboradorService,
    private router: Router) {}

  
  ngOnInit() {
    localStorage.setItem('indinicio',"false");   
    this.callIniciativas();
  }

  async callIniciativas() {
    this.loading = true;
    let listaProy: UsuarioPerfilFireService[] = [];
    let lista: ColaboradorDetalleFire[];   
    var datos = [];  
    let colaboradorRef = this.colaboradores.getColaboradores();
    colaboradorRef.subscribe(data => {
      var lista = [];      
      for(var i = 0; i < data.length; i++){
        lista.push(data[i].payload.doc.data() as ColaboradorDetalleFire);
      }
      lista.forEach(colaboradorFire => {
        colaboradorFire.colaboradores.forEach(element  => {
          let usuariosvc = new UsuarioPerfilFireService;
          usuariosvc.codigo = element.codigo;
          usuariosvc.usuario = element.codigoUsuario;
          usuariosvc.nombre = element.nombres;
          usuariosvc.cargo = element.cargo;
          usuariosvc.perfil =  element.perfil;
          datos.push(usuariosvc);
        })
      });  
      this.colaborador =  new MatTableDataSource(datos);
      this.colaborador.paginator = this.paginator;
      this.colaborador.sort = this.sort;    
      this.loading = false;
      this.InicializaDatosBusqueda();
    });
    
    }
    InicializaDatosBusqueda(){
      // Inicializa los datos de busqueda
      this.colaborador.filterPredicate = (data, filter) => {
       const dataStr = data.codigo + data.usuario + data.nombre + data.cargo + data.perfil;
       return dataStr.toLowerCase().indexOf(filter) != -1;       
     }
   }

   buscarDatos(filterValue: string) {
    this.colaborador.filter = filterValue.trim().toLowerCase();
    }
    
  selectedDocumento(todo: ColaboradorFire) {
    this.InReset();
  }
  InReset() {
  }
  highlight(row){
    this.selectedRowIndex = row.usuario;
  }
  openDialogNew(){
   
  }
}
