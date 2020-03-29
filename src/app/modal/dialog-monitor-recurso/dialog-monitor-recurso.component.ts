import { Component, OnInit, ViewChild, Inject, OnDestroy, AbstractType } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { IniciativaMainFire } from 'src/app/shared/models/iniciativa-main-fire';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseParametroService } from 'src/app/shared/services/firebase-parametro.service';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaMainService } from 'src/app/shared/services/firebase-iniciativa-main.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ColaboradorFire } from 'src/app/shared/models/colaborador-fire';
import { ColaboradorDetalleFire } from 'src/app/shared/models/colaborador-detalle-fire';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import { NgStyle, DatePipe } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IniciativaFire } from 'src/app/shared/models/iniciativa-fire';
import { UsuarioPerfilFireService } from 'src/app/shared/models/usuario-perfil-fire.service';
import { ContactoFire } from 'src/app/shared/models/contacto-fire';
import { timingSafeEqual } from 'crypto';
import { ActividadFireMonitor } from 'src/app/shared/models/actividad-fire-monitor';

@Component({
  selector: 'app-dialog-monitor-recurso',
  templateUrl: './dialog-monitor-recurso.component.html',
  styleUrls: ['./dialog-monitor-recurso.component.css']
})
export class DialogMonitorRecursoComponent implements OnInit, OnDestroy {
  regRecursos: FormGroup;
  ultimaDia: number;
  iniciativa= new MatTableDataSource<IniciativaMainFire>([]);
  idinicitiva: string;
  codigoSVT: number;
  fechahoy: Date = new Date();
  selectedRowIndex = -1;
  titulo: string;
  tipo: string;
  avances: string;
  coltitulo: string;
  totalHoras: number;
  usuario: string;
  codigoUsuario: string="";
  totalacu: number;
  codigo: string;
  total: number;
  colaboradores: ContactoFire = new ContactoFire();
  dia: number;
  columnas: string[] = ['codigo', 'nombres','horas'];
  public lista = [] as IniciativaMainFire[];
  public colaboradorCtrl: FormControl = new FormControl();
  public colaboradorFilterCtrl: FormControl = new FormControl();
  public filteredColaboradores: ReplaySubject<ColaboradorDetalleFire[]> = new ReplaySubject<ColaboradorDetalleFire[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  loading: boolean;
  colaborador= new MatTableDataSource<ContactoFire>([]);
  iniciativas= new MatTableDataSource<IniciativaMainFire>([]);
  paginator: MatPaginator;
  sort: MatSort;
  constructor(public dialogRef: MatDialogRef<DialogMonitorRecursoComponent>, 
    private firebaseColaboradores: FirebaseColaboradorService,public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public datafire:  ActividadFireMonitor,
    private firebaseIniciativas: FirebaseIniciativaMainService) {
      this.idinicitiva = datafire.iniciativa.idIniciativa;
      this.tipo = datafire.tipo;
      this.codigoSVT = datafire.codigo;
      this.dia = datafire.dia;
      this.codigoUsuario = datafire.codigousuario;
      this.regRecursos = new FormGroup({
        tituloInputDialog: new FormControl(),
        codigoInputDialog: new FormControl(),
        porAsignarLabel: new FormControl()
      })
  }

  close(): void {
    this.dialogRef.close();
  }
 
  ultimoDiaMes(fecha){    
    let arrayFecha = fecha.split('-');
    let fechaUltimo = new Date(arrayFecha[0], arrayFecha[1]);      
    fechaUltimo.setDate(fechaUltimo.getDate() - 1);    
    return fechaUltimo.getDate();
  } 

  ngOnInit() {
    let latest_date =new Date();
    let f =this.datepipe.transform(latest_date, 'yyyy-MM-dd');
    this.ultimaDia = +this.ultimoDiaMes(f);
    if (this.tipo=="USUARIO"){
      this.coltitulo ="NOMBRES DEL RECURSO";
      this.callColaboradores();
    }else{
      this.coltitulo ="DETALLE DE LA INICIATIVA";
      this.codigo = this.codigoUsuario;
      this.calliniciativas();
    }
  }

  callColaboradores() {
    this.loading = true;
    var datos = []; 
    this.total=0;
    this.totalHoras= 0;
    this.totalacu=0;
    this.avances="";
    let codigosvt: string = ""+this.codigoSVT;
    // ----
    let iniciativasRef = this.firebaseIniciativas.getIniciativa2(this.idinicitiva);
    iniciativasRef.forEach(data => {
      let iniciativaobj = data.data() as IniciativaMainFire;        
          this.codigo = ''+iniciativaobj.codigoSVT;
          this.titulo = iniciativaobj.titulo; 
          this.totalHoras = iniciativaobj.horaReal;
          iniciativaobj.recursos.forEach(colaboradorobj=>{
            
              let usuariosvc = new ContactoFire;
              usuariosvc.codigo = "";
              usuariosvc.nombres = "";
              usuariosvc.horas=0;

              usuariosvc.codigo = colaboradorobj.codigoUsuario;
              usuariosvc.nombres = colaboradorobj.nombres;
              let i: number=0;
              colaboradorobj.horasReg.forEach(horasreg=>{      
                if (this.dia==99){
                  for(i=1; i<=this.ultimaDia; i++){                    
                    if (this.pad(i,2)+'/'+this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasreg.fecha, 'dd/MM')){
                      usuariosvc.horas = 0;
                      this.total+=horasreg.horas;
                    }                                             
                  }
                  this.totalacu += horasreg.horas;
                }else{
                  this.totalacu += horasreg.horas;
                  if (this.pad(this.dia,2)+'/'+this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasreg.fecha, 'dd/MM')){
                    usuariosvc.horas += horasreg.horas;
                    this.total+=usuariosvc.horas;
                  } 
                }      
              });              ;
              datos.push(usuariosvc);
          });
          this.avances = Math.round(((this.totalacu/this.totalHoras) * 100)) + '%'
          this.colaborador =  new MatTableDataSource(datos);
          this.colaborador.paginator = this.paginator;
          this.colaborador.sort = this.sort;    
          this.loading = false;
        });
    this.loading = false;
  }
  selectedDocumento(todo: IniciativaFire) {
   
  }
  highlight(row){
    
  }

  calliniciativas() {
    this.loading = true;
    var datoslist = []; 
    let total=0;
    let totalHoras= 0;
    let totalacu=0;
    let avances="";
    // ----
    let iniciativasRef = this.firebaseIniciativas.getIniciativaMultiple("","","codigoSVT","desc");
    iniciativasRef.forEach(elem=>{
      elem.forEach(datos=>{
        let iniciativaobj= datos.payload.doc.data() as IniciativaMainFire;
        this.codigo = this.codigoUsuario;
        if (this.dia==99){totalHoras = 9*this.ultimaDia;}
        else{totalHoras = 9*this.ultimaDia;}   
        if (undefined!=iniciativaobj.recursos&&iniciativaobj.recursos.length>0){
            iniciativaobj.recursos.forEach(colaborador=>{
              if (colaborador.codigoUsuario==this.codigo){
                  let usuariosvc = new ContactoFire;
                  this.titulo = colaborador.nombres; 
                  usuariosvc.codigo = "";
                  usuariosvc.nombres = "";
                  usuariosvc.horas=0;
                  usuariosvc.codigo = ''+iniciativaobj.codigoSVT;
                  usuariosvc.nombres = iniciativaobj.titulo;
                  let i: number=0;
                  if(undefined!=colaborador.horasReg&&colaborador.horasReg.length>0){
                      colaborador.horasReg.forEach(horasingreso=>{
                        if (this.dia==99){
                          for(i=1; i<=this.ultimaDia; i++){
                            if (this.pad(i,2)+'/'+this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasingreso.fecha, 'dd/MM')){
                              usuariosvc.horas = 0;
                              total+=horasingreso.horas;
                                }   
                              }
                              totalacu += horasingreso.horas;
                        }else{
                              totalacu += horasingreso.horas;
                              if (this.pad(this.dia,2)+'/'+this.datepipe.transform(Date(), 'MM') == this.datepipe.transform(horasingreso.fecha, 'dd/MM')){
                                usuariosvc.horas += horasingreso.horas;                       
                                total+=usuariosvc.horas;
                              }
                        }
                      });
                  }
                  datoslist.push(usuariosvc);      
                }
                this.totalacu = totalacu;
                this.total = total;
                this.totalHoras = totalHoras;           
                this.avances = Math.round(((totalacu/totalHoras) * 100)) + '%'
                this.colaborador =  new MatTableDataSource(datoslist);
                this.colaborador.paginator = this.paginator;
                this.colaborador.sort = this.sort;    
                this.loading = false;
            });
        };
      });
    });    
    this.loading = false;
  }


  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
