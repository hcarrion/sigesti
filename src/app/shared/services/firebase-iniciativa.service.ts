import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IniciativaFire } from '../models/iniciativa-fire';
import { CorrelativoFire } from '../models/correlativo-fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIniciativaService {

  iniciativaListRef: AngularFirestoreCollection<any>;
  correlativoListRef: AngularFirestoreCollection<any>;
  private correlativoRef: DocumentReference;
  isUpdateCorrelativo: boolean;

  constructor(private firestore: AngularFirestore) { }

  async createIniciativa(iniciativaFire: IniciativaFire){
    this.isUpdateCorrelativo = true;
    return await this.getCorrelativo(iniciativaFire);
    /*let numIniciativa = await this.getCorrelativo();
    debugger;
    const iniciativa = await JSON.parse(JSON.stringify(iniciativaFire));
    this.iniciativaListRef = this.firestore.collection<IniciativaFire>('iniciativas');
    return this.iniciativaListRef.add(iniciativa);*/
  }

  getIniciativas() {
    return this.firestore.collection('iniciativas').snapshotChanges();
  }

  saveCorrelativo(){
    let correlativoF = new CorrelativoFire();
    correlativoF.iniciativa = 1;
    const correlativoIni = JSON.parse(JSON.stringify(correlativoF));
    this.correlativoListRef = this.firestore.collection<CorrelativoFire>('correlativos');
    this.correlativoListRef.add(correlativoIni);
  }

  async getCorrelativo(iniciativaFire: IniciativaFire){
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
        this.iniciativaListRef = this.firestore.collection<IniciativaFire>('iniciativas');
        return this.iniciativaListRef.add(iniciativa);
      }
    });
  }
}
