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

  getIniciativaMultiple(campo1: string, condicion1: string, orden: string, menmay: firebase.firestore.OrderByDirection){
    var ArrBus = new Array;
    var ArrCamp = new Array;
    var ArrBus1 = new Array;
    var cont=0;    
    var contC=0; 
    var contCC=0; 
    if (campo1 != "" && condicion1 != "" && condicion1 != ";") {
          campo1.split(";").forEach(element => {
            ArrCamp[cont] = element;
            cont++;
          });          
          condicion1.split(";").forEach(element => {
              element=element+",";            
              element.split(",").forEach(element1 => {
              if (element1!=""){                  
                  ArrBus1[contCC] = element1;                                    
                  contCC++;
              }
              });
              ArrBus[contC] = ArrBus1; 
              contCC=0;
              contC++            
          });          
          switch (campo1.split(";").length-1){
              case 1:
                if (orden=="codigoSVT"){
                  return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).orderBy(orden,menmay)).snapshotChanges();
                }else{
                  return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).orderBy(orden,menmay).orderBy("codigoSVT",menmay)).snapshotChanges();
                }                
                break;
              case 2:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).orderBy(orden,menmay)).snapshotChanges();                                
                break;
              case 3:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).where(ArrCamp[2],"in",ArrBus[2]).orderBy(orden,menmay)).snapshotChanges();
                break;
              case 4:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).where(ArrCamp[2],"in",ArrBus[2]).where(ArrCamp[3],"in",ArrBus[3]).orderBy(orden,menmay)).snapshotChanges();
                break;
              case 5:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).where(ArrCamp[2],"in",ArrBus[2]).where(ArrCamp[3],"in",ArrBus[3]).where(ArrCamp[4],"in",ArrBus[4]).orderBy(orden,menmay)).snapshotChanges();
                break;
              case 6:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).where(ArrCamp[2],"in",ArrBus[2]).where(ArrCamp[3],"in",ArrBus[3]).where(ArrCamp[4],"in",ArrBus[4]).where(ArrCamp[5],"in",ArrBus[5]).orderBy(orden,menmay)).snapshotChanges();
                break;
              case 7:
                return this.firestore.collection('iniciativasmain', ref => ref.where(ArrCamp[0],"in",ArrBus[0]).where(ArrCamp[1],"in",ArrBus[1]).where(ArrCamp[2],"in",ArrBus[2]).where(ArrCamp[3],"in",ArrBus[2]).where(ArrCamp[4],"in",ArrBus[4]).where(ArrCamp[5],"in",ArrBus[5]).where(ArrCamp[6],"in",ArrBus[6]).orderBy(orden,menmay)).snapshotChanges();
                break;
          }             
    } 
    else{
      return this.firestore.collection('iniciativasmain', ref => ref.orderBy("codigoSVT",menmay)).snapshotChanges();
    }    
  }

  getIniciativa(iniciativaFire: IniciativaMainFire) {
    return this.firestore.doc('iniciativasmain/'+iniciativaFire.idIniciativa).snapshotChanges();
  }

  getIniciativa2(idIniciativa: string) {
    return this.firestore.collection('iniciativasmain').doc(idIniciativa).get();
  }

  getIniciativa4(idIniciativa: string) {
    return this.firestore.collection('iniciativasmain').doc(idIniciativa).snapshotChanges();
  }

  getIniciativa5(idIniciativa: string) {
    return this.firestore.collection('iniciativasmain').snapshotChanges();
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
