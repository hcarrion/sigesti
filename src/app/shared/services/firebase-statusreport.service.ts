import { Injectable } from '@angular/core';
import { StatusReportFire } from '../models/status-report-fire';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { CorrelativoFire } from '../models/correlativo-fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStatusreportService {

  statusReportListRef: AngularFirestoreCollection<any>;
  correlativoListRef: AngularFirestoreCollection<any>;
  private correlativoRef: DocumentReference;
  isUpdateCorrelativo: boolean;

  constructor(private firestore: AngularFirestore) { }

  async createStatusReport(statusReportFire: StatusReportFire){
    this.isUpdateCorrelativo = true;
    return await this.getCorrelativo(statusReportFire);
  }

  /*getIniciativas() {
    return this.firestore.collection('iniciativas').snapshotChanges();
  }*/
 
  /*getStatusReport(idIniciativa: string){
    return this.firestore.collection('statusreports', ref => ref.where('idIniciativa', '==', idIniciativa).orderBy('numeroSemana', "desc").limit(1)).snapshotChanges();
  }*/
  getStatusReport(idIniciativa: string){
    return this.firestore.collection('statusreports', ref => ref.where('idIniciativa', '==', idIniciativa).orderBy('numeroSemana', "desc")).snapshotChanges();
  }
  getStatusReportFiltro(idIniciativa: string,campo: string, condicion: number){
    return this.firestore.collection('statusreports', ref => ref.where('idIniciativa', '==', idIniciativa).where(campo, '==', condicion).orderBy('numeroSemana', "desc")).snapshotChanges();
  }
  /*getIniciativa(iniciativaFire: IniciativaFire) {
    return this.firestore.doc('iniciativas/'+iniciativaFire.idIniciativa).snapshotChanges();
  }

  getIniciativa2(idIniciativa: string) {
    return this.firestore.collection('iniciativas').doc(idIniciativa).get();
  }

  saveCorrelativo(){
    let correlativoF = new CorrelativoFire();
    correlativoF.iniciativa = 1;
    const correlativoIni = JSON.parse(JSON.stringify(correlativoF));
    this.correlativoListRef = this.firestore.collection<CorrelativoFire>('correlativos');
    this.correlativoListRef.add(correlativoIni);
  }*/

  async getCorrelativo(statusReportFire: StatusReportFire){
    let correlativoStatusReport;
    let correlativo = new CorrelativoFire();
    let correlativosRef = this.firestore.collection('correlativos').snapshotChanges();
    correlativosRef.subscribe(data => {
      data.forEach(correlativoObj => {
        let correlativoObject = correlativoObj.payload.doc.data() as CorrelativoFire;
        this.correlativoRef = correlativoObj.payload.doc.ref;
        correlativo = correlativoObject;
      });
      if(this.isUpdateCorrelativo){
        correlativoStatusReport = correlativo.statusreport;
        correlativo.statusreport = correlativoStatusReport + 1;
        const correlativoCons = JSON.parse(JSON.stringify(correlativo));
        /*this.firestore.doc('correlativos').update(correlativoCons);*/
        this.correlativoRef.update(correlativoCons);
        this.isUpdateCorrelativo = false;

        statusReportFire.codigo = correlativoStatusReport;
        const statusReport = JSON.parse(JSON.stringify(statusReportFire));
        this.statusReportListRef = this.firestore.collection<StatusReportFire>('statusreports');
        return this.statusReportListRef.add(statusReport);
      }
    });
  }

  updateStatusReport(statusReportFire: StatusReportFire){
    const statusReport = JSON.parse(JSON.stringify(statusReportFire));
    return this.firestore.doc('statusreports/'+statusReportFire.idStatusReport).update(statusReport);
  }
  /*
  getPlanesIniciativaFiltro(campo: string, condicion: string){
    return this.firestore.collection('iniciativas', ref => ref.where(campo, '==', condicion).where('estado.descripcion', 'in', ["Asignado", "Terminado", "Suspendido"]).orderBy('prioridad.codigo')).snapshotChanges();
  }*/
}
