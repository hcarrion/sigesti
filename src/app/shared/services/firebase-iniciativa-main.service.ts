import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { IniciativaMainFire } from '../models/iniciativa-main-fire';
import { CorrelativoFire } from '../models/correlativo-fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIniciativaMainService {

  iniciativaListRef: AngularFirestoreCollection<any>;
  correlativoListRef: AngularFirestoreCollection<any>;
  private correlativoRef: DocumentReference;
  isUpdateCorrelativo: boolean;
  
  constructor(private firestore: AngularFirestore) { }

  async createIniciativa(iniciativaFire: IniciativaMainFire){
    this.isUpdateCorrelativo = true;
    return await this.getCorrelativo(iniciativaFire);
    /*let numIniciativa = await this.getCorrelativo();
    
    const iniciativa = await JSON.parse(JSON.stringify(iniciativaFire));
    this.iniciativaListRef = this.firestore.collection<IniciativaFire>('iniciativasmain');
    return this.iniciativaListRef.add(iniciativa);*/
  }

  getIniciativas() {
    return this.firestore.collection('iniciativasmain').snapshotChanges();
  }
 
  getIniciativaFiltro(campo: string,condicion: string, campo1: string, condicion1: string){
    var ArrBus = new Array;
    var cont=0;    
    if (campo1 != "") {
      condicion1.split(",").forEach(element => {
        ArrBus[cont] = element;
        cont++;
      }); 
      condicion =  condicion.toUpperCase();  
      return this.firestore.collection('iniciativasmain', ref => ref.where(campo, '==', condicion).where(campo1,"in",ArrBus)).snapshotChanges();
    } 
    else{
      condicion =  condicion.toUpperCase();
      return this.firestore.collection('iniciativasmain', ref => ref.where(campo, '==', condicion)).snapshotChanges();
    }    
  }

  getIniciativaFiltroMulti(campo: string,condicion: string){
    return this.firestore.collection('iniciativasmain', ref => ref.where(campo, 'array-contains-any', condicion.toUpperCase)).snapshotChanges();
  }
  getIniciativa(iniciativaFire: IniciativaMainFire) {
    return this.firestore.doc('iniciativasmain/'+iniciativaFire.idIniciativa).snapshotChanges();
  }

  getIniciativa2(idIniciativa: string) {
    return this.firestore.collection('iniciativasmain').doc(idIniciativa).get();
  }

  getIniciativa3(idIniciativa: string) {
    return this.firestore.doc('iniciativasmain/'+idIniciativa).snapshotChanges();
  }

  saveCorrelativo(){
    let correlativoF = new CorrelativoFire();
    correlativoF.iniciativa = 1;
    const correlativoIni = JSON.parse(JSON.stringify(correlativoF));
    this.correlativoListRef = this.firestore.collection<CorrelativoFire>('correlativos');
    this.correlativoListRef.add(correlativoIni);
  }

  async getCorrelativo(iniciativaFire: IniciativaMainFire){
    let correlativoIniciativa;
    let correlativo = new CorrelativoFire();
    let correlativosRef = this.firestore.collection('correlativos').snapshotChanges();
    correlativosRef.subscribe(data => {
      data.forEach(correlativoObj => {
        let correlativoObject = correlativoObj.payload.doc.data() as CorrelativoFire;
        this.correlativoRef = correlativoObj.payload.doc.ref;
        correlativo = correlativoObject;
      });
      if(this.isUpdateCorrelativo){
        correlativoIniciativa = correlativo.iniciativa;
        correlativo.iniciativa = correlativoIniciativa + 1;
        const correlativoCons = JSON.parse(JSON.stringify(correlativo));
        /*this.firestore.doc('correlativos').update(correlativoCons);*/
        this.correlativoRef.update(correlativoCons);
        this.isUpdateCorrelativo = false;

        iniciativaFire.numeroIniciativa = correlativoIniciativa;
        const iniciativa = JSON.parse(JSON.stringify(iniciativaFire));
        this.iniciativaListRef = this.firestore.collection<IniciativaMainFire>('iniciativasmain');
        return this.iniciativaListRef.add(iniciativa);
      }
    });
  }

  updateIniciativa(iniciativaFire: IniciativaMainFire){
    const iniciativa = JSON.parse(JSON.stringify(iniciativaFire));
    return this.firestore.doc('iniciativasmain/'+iniciativaFire.idIniciativa).update(iniciativa);
  }

  getPlanesIniciativaFiltro(campo: string, condicion: string){
    return this.firestore.collection('iniciativasmain', ref => ref.where(campo, '==', condicion).where('estado.descripcion', 'in', ["ASIGNADO", "EN PROCESO", "TERMINADO", "SUSPENDIDO"]).orderBy('prioridad.codigo')).snapshotChanges();
  }
}
