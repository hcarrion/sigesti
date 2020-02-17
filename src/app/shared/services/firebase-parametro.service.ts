import { Injectable } from '@angular/core';
import { ParametroFire } from '../models/parametro-fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseParametroService {
  
  parametroListRef: AngularFireList<any>;
  parametroObjectRef: AngularFireObject<any>;
  parametrosListRef: AngularFirestoreCollection<any>;
  constructor(private firestore: AngularFirestore, private angularFireDatabase: AngularFireDatabase) { }

  obtenerParametros() {
    let ref = this.angularFireDatabase.database.ref('parametros');
    return ref;
  }

  async obtenerEstados(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('estado').once('value'));
    return parameter; 
  }

  async obtenerTipos(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('tipo').once('value'));
    return parameter; 
  }

  async obtenerClasificaciones(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('clasificacion').once('value'));
    return parameter; 
  }

  async obtenerCategorias(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('categoria').once('value'));
    return parameter; 
  }

  async obtenerPrioridades(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('prioridad').once('value'));
    return parameter; 
  }

  async obtenerAreas(ref): Promise<any> {
    let parameter = (await ref.orderByChild("nombre").equalTo('area').once('value'));
    return parameter; 
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

  getParametros() {
    return this.firestore.collection('parametros').snapshotChanges();
  }

  createParameter(parametroFire: ParametroFire){
    const param = JSON.parse(JSON.stringify(parametroFire));
    this.parametrosListRef = this.firestore.collection<ParametroFire>('parametros');
    return this.parametrosListRef.add(param);
  }

  getParametrosFiltro(campo: string, condicion: string){
    return this.firestore.collection('parametros', ref => ref.where(campo, '==', condicion)).snapshotChanges();
  }

}
