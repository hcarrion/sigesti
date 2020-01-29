import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ContactoFire } from '../models/contacto-fire';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseContactoService {
  contactoListRef: AngularFirestoreCollection<any>;
  constructor(private firestore: AngularFirestore) { }

  async createContacto(contactoFire: ContactoFire){
    this.contactoListRef = this.firestore.collection('contactos', ref => ref.where('codigo', '==', contactoFire.codigo));
    await this.contactoListRef.get().toPromise().then(doc => {
      if (1 <= doc.size) {
        throw new Error("repetido");
      }else{
        const contacto = JSON.parse(JSON.stringify(contactoFire));
        this.contactoListRef = this.firestore.collection<ContactoFire>('contactos');
        return this.contactoListRef.add(contacto);
      }
    }).catch((err) => {throw new Error(err.message);});
  }

  getContactos() {
    return this.firestore.collection('contactos').snapshotChanges();
  }

  async updateContacto(contactoFire: ContactoFire){
    this.contactoListRef = this.firestore.collection('contactos', ref => ref.where('codigo', '==', contactoFire.codigo));
    await this.contactoListRef.get().toPromise().then(doc => {
      debugger;
      if (1 <= doc.size) {
        throw new Error("repetido");
      }else{
        const contacto = JSON.parse(JSON.stringify(contactoFire));
        return this.firestore.doc('contactos/'+contactoFire.idContacto).update(contacto);
      }
    }).catch((err) => {throw new Error(err.message);});
  }
}