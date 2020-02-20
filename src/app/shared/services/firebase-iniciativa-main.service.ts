import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { IniciativaMainFire } from '../models/iniciativa-main-fire';
import { CorrelativoFire } from '../models/correlativo-fire';
import { IniciativaTrazabilidad } from '../models/iniciativa-trazabilidad';
import { Trazabilidad } from '../models/trazabilidad';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIniciativaMainService {

  iniciativaListRef: AngularFirestoreCollection<any>;
  correlativoListRef: AngularFirestoreCollection<any>;
  trazabilidadListRef: AngularFirestoreCollection<any>;
  private correlativoRef: DocumentReference;
  private trazabilidadRef: DocumentReference;
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
    let iniciativaTrazabilidad = new IniciativaTrazabilidad();
    iniciativaTrazabilidad.correlativo = 1;
    let trazabilidadList: Trazabilidad[] = [];
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

        let trazabilidad = new Trazabilidad();
        trazabilidad.codigo = iniciativaTrazabilidad.correlativo;
        trazabilidad.estado = iniciativaFire.estado;
        trazabilidad.fechaReg = new Date();
        trazabilidadList.push(trazabilidad);
        iniciativaTrazabilidad.numeroIniciativa = correlativoIniciativa;
        iniciativaTrazabilidad.trazabilidad = trazabilidadList;
        const traza = JSON.parse(JSON.stringify(iniciativaTrazabilidad));
        this.trazabilidadListRef = this.firestore.collection<IniciativaTrazabilidad>('trazabilidad');
        this.trazabilidadListRef.add(traza);

        iniciativaFire.numeroIniciativa = correlativoIniciativa;
        const iniciativa = JSON.parse(JSON.stringify(iniciativaFire));
        this.iniciativaListRef = this.firestore.collection<IniciativaMainFire>('iniciativasmain');
        return this.iniciativaListRef.add(iniciativa);
      }
    });
  }

  async updateIniciativa(iniciativaFire: IniciativaMainFire){
    return await this.getTrazabilidad(iniciativaFire);
    
  }

  getPlanesIniciativaFiltro(campo: string, condicion: string){
    return this.firestore.collection('iniciativasmain', ref => ref.where(campo, '==', condicion).where('estado.descripcion', 'in', ["PLANIFICACION", "DESARROLLO", "QA", "PRODUCCION", "SEGUIMIENTO POST", "SUSPENDIDO", "ANULADO"]).orderBy('prioridad.codigo')).snapshotChanges();
  }

  getTrazabilidad(iniciativaFire: IniciativaMainFire){
    let trazabilidad = new IniciativaTrazabilidad();
    let trazabilidadRef = this.firestore.collection('trazabilidad', ref => ref.where('numeroIniciativa', '==', iniciativaFire.numeroIniciativa)).get();
    trazabilidadRef.subscribe(data => {
      data.forEach(trazaObj => {
        let trazabilidadObject = trazaObj.data() as IniciativaTrazabilidad;
        this.trazabilidadRef = trazaObj.ref;
        trazabilidad = trazabilidadObject;
      });
      let isEqualsEstado = true;
      trazabilidad.trazabilidad.forEach(element =>{
        if(element.codigo = trazabilidad.correlativo){
          if(element.estado.codigo != iniciativaFire.estado.codigo){
            isEqualsEstado = false;
          }
        }
      });
      if(!isEqualsEstado){
        let trazaList = trazabilidad.trazabilidad;
        let trazaObj = new Trazabilidad();
        let newCorrelativo = trazabilidad.correlativo +1;
        trazaObj.codigo = newCorrelativo;
        trazaObj.estado = iniciativaFire.estado;
        trazaObj.fechaReg = new Date();
        trazaList.push(trazaObj);
        trazabilidad.trazabilidad = trazaList;
        trazabilidad.correlativo = newCorrelativo;
        const trazaCons = JSON.parse(JSON.stringify(trazabilidad));
        this.trazabilidadRef.update(trazaCons);
      }
      const iniciativa = JSON.parse(JSON.stringify(iniciativaFire));
      return this.firestore.doc('iniciativasmain/'+iniciativaFire.idIniciativa).update(iniciativa);
    });
  }
}
