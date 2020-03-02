import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ColaboradorFire } from '../models/colaborador-fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseColaboradorService {

  colaboradorListRef: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) { }

  createColaborador(colaboradorFire: ColaboradorFire){
    const colab = JSON.parse(JSON.stringify(colaboradorFire));
    this.colaboradorListRef = this.firestore.collection<ColaboradorFire>('colaboradores');
    return this.colaboradorListRef.add(colab);
  }

  getColaboradores() {
    return this.firestore.collection('colaboradores').snapshotChanges();
  }
  getColaboradoresfiltro(campo: string, condicion: string) {
    if(campo!=""){
      return this.firestore.collection('colaboradores').snapshotChanges();
    }else{
      return this.firestore.collection('colaboradores',ref => ref.where(campo, '==', condicion)).snapshotChanges();
    }    
  }
}
