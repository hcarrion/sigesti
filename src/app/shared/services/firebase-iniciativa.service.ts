import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IniciativaFire } from '../models/iniciativa-fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseIniciativaService {

  iniciativaListRef: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) { }

  createIniciativa(iniciativaFire: IniciativaFire){
    const iniciativa = JSON.parse(JSON.stringify(iniciativaFire));
    this.iniciativaListRef = this.firestore.collection<IniciativaFire>('iniciativas');
    return this.iniciativaListRef.add(iniciativa);
  }

  getIniciativas() {
    return this.firestore.collection('iniciativas').snapshotChanges();
  }
}
