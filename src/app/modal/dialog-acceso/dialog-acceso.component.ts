import { Component, OnInit, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { IniciativaMainFire } from 'src/app/shared/models/iniciativa-main-fire';
import { ColaboradorDetalleFire } from 'src/app/shared/models/colaborador-detalle-fire';
import { FirebaseColaboradorService } from 'src/app/shared/services/firebase-colaborador.service';
import { FirebaseIniciativaMainService } from 'src/app/shared/services/firebase-iniciativa-main.service';
import { ColaboradorFire } from 'src/app/shared/models/colaborador-fire';


@Component({
  selector: 'app-dialog-acceso',
  templateUrl: './dialog-acceso.component.html',
  styleUrls: ['./dialog-acceso.component.css']
})
export class DialogAccesoComponent implements OnInit {
  public usuario: string;
  public mensaje: string;
  public perfil: string;
  loading: boolean;
  password: string;
  registerForm: FormGroup;
  iniciativa= new MatTableDataSource<IniciativaMainFire>([]);
  colaboradorDetFireList: ColaboradorDetalleFire[] = [];
  
  constructor(private dialogRef: MatDialogRef<DialogAccesoComponent>, private formBuilder: FormBuilder,
    private firebaseColaboradores: FirebaseColaboradorService){}
    
  get f() { return this.registerForm.controls; }
  
  ngOnInit() {
    localStorage.setItem("usuario","");
    localStorage.setItem("nomusu","");
    localStorage.setItem("cargousu","");
    localStorage.setItem("perfil","");
    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  openacceso(usu: string, pwd: string){

    this.loading = true;
  
    if(usu.length==0&&pwd.length==0){
       this.mensaje="Error: los datos del usuario son obligatorios, verifique y vuelva a ingresar"; 
       this.loading = false;
       return;
    }
    else{
      this.usuario= usu;
      this.password= pwd;
      this.mensaje="";
      localStorage.setItem("usuario","");
      localStorage.setItem("nomusu","");
      localStorage.setItem("cargousu","");
      localStorage.setItem("perfil","");
      let colaboradoresRef = this.firebaseColaboradores.getColaboradores();

      colaboradoresRef.subscribe(data => {data.forEach(colabObj => {
          let colabObject= colabObj.payload.doc.data() as ColaboradorFire;
          colabObject.colaboradores.forEach(dtos=>{
            if (dtos.codigoUsuario == usu ) {               
              localStorage.setItem("usuario",dtos.codigoUsuario);
              localStorage.setItem("nomusu",dtos.nombres);
              localStorage.setItem("cargousu",dtos.cargo);
              localStorage.setItem("perfil",dtos.perfil);
              this.loading = false;
              this.dialogRef.close(dtos.perfil);
              return;
              }
          })
          if (localStorage.getItem("usuario")==undefined){
            this.mensaje="Error: el usuario no existe en la coleccion de colaboradores, verifique o conuniquese con su administrador"; 
            this.loading = false;
            return;
          }else if (localStorage.getItem("usuario")==""){
            this.mensaje="Error: el usuario no existe en la coleccion de colaboradores, verifique o conuniquese con su administrador"; 
            this.loading = false;
            return;
          }else if (localStorage.getItem("usuario")!=usu){
            this.mensaje="Error: el usuario no existe en la coleccion de colaboradores, verifique o conuniquese con su administrador";
            this.loading = false;
            return;
          }
        });
      });
    }
    
  }
 
}
