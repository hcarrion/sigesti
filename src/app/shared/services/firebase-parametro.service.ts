import { Injectable } from '@angular/core';
import { ParametroFire } from '../models/parametro-fire';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseParametroService {

  parametroListRef: AngularFireList<any>;
  parametroObjectRef: AngularFireObject<any>;
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  obtenerParametros() {
    this.parametroListRef = this.angularFireDatabase.list('parametros');
    return this.parametroListRef;
  }

  async parametrarFirebase(parametroFire: ParametroFire) {
    const urlDatabase = this.angularFireDatabase.database.ref(`parametros`);
    this.parametroListRef = this.angularFireDatabase.list(urlDatabase);
    this.parametroListRef.push(parametroFire)

      .catch(error => {
        this.errorMgmt(error);
      });
  }

  private errorMgmt(error: any) {
    console.log(error);
  }
}
