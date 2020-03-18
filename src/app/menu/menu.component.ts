import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { map, shareReplay } from 'rxjs/operators';
import { DialogAccesoComponent } from '../modal/dialog-acceso/dialog-acceso.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnDestroy  { 
  mobileQuery: MediaQueryList;
  usuario: string;
  perfil: string;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  tipomenu: string;
  pantallaacceso: boolean[]=[];
  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private matDialog: MatDialog, private breakpointObserver: BreakpointObserver) {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  shouldRun = true;

  ngOnInit(){
    localStorage.setItem('indinicio', "true");
    localStorage.setItem("usuario","");
    localStorage.setItem("nomusu","");
    localStorage.setItem("cargousu","");
    this.openDialogRecursos("");   	  
  } 

  openDialogRecursos(idIniciativa: string): void {
    const dialogRef = this.matDialog.open(DialogAccesoComponent, /*dialogConfig,*/
      { width: '500px',
        height: '500px',
        disableClose: true,
        data: idIniciativa
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getperfiles(result);
      this.usuario = localStorage.getItem("usuario") + "-" + localStorage.getItem("nomusu");
      this.perfil =  localStorage.getItem("perfil");
    }); 

  }



  readLocalStorageValue(key) {
    let value =   localStorage.getItem(key);

    if(value == undefined) {
      value =='false';
    }
    
    return value;
  }

  getperfiles(perfiles: string){
    switch (perfiles){
      case "ADMINISTRADOR": 
          this.pantallaacceso[1]= true;
          this.pantallaacceso[2]= true;
          this.pantallaacceso[3]= true;
          this.pantallaacceso[4]= true;
          this.pantallaacceso[5]= true;
          this.pantallaacceso[6]= true;
          this.pantallaacceso[7]= true;
          break;
      case "COLABORADOR": 
          this.pantallaacceso[1]= true;
          this.pantallaacceso[2]= false;
          this.pantallaacceso[3]= true;
          this.pantallaacceso[4]= false;
          this.pantallaacceso[5]= false;
          this.pantallaacceso[6]= false;
          this.pantallaacceso[7]= true;
          break;
      case "LIDER": 
          this.pantallaacceso[1]= true;
          this.pantallaacceso[2]= false;
          this.pantallaacceso[3]= true;
          this.pantallaacceso[4]= true;
          this.pantallaacceso[5]= true;
          this.pantallaacceso[6]= true;
          this.pantallaacceso[8]= false;
          break;
      case "USUARIO": 
          this.pantallaacceso[1]= true;
          this.pantallaacceso[2]= false;
          this.pantallaacceso[3]= false;
          this.pantallaacceso[4]= false;
          this.pantallaacceso[5]= false;
          this.pantallaacceso[6]= false;
          this.pantallaacceso[7]= false;
          break;
    }

  }
}
