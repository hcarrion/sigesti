import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ContactoFire } from '../models/contacto-fire';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseContactoService {
  contactoListRef: AngularFirestoreCollection<any>;
  contactoDoc: AngularFirestoreDocument<any>;
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
    let isCodigoContact: boolean = false;
    this.contactoDoc = this.firestore.doc('contactos/'+contactoFire.idContacto);
    await this.contactoDoc.get().toPromise().then(doc => {
      let contactCodigo = doc.data().codigo;
      if(contactoFire.codigo != contactCodigo){
        isCodigoContact = true;
      }
      if (isCodigoContact) {
        throw new Error("repetido");
      }else{
        const contacto = JSON.parse(JSON.stringify(contactoFire));
        return this.firestore.doc('contactos/'+contactoFire.idContacto).update(contacto);
      }
    }).catch((err) => {throw new Error(err.message);});
  }

  async updateContacto2(contactoFire: ContactoFire){
    let isCodigoContact: boolean = false;
    this.contactoListRef = this.firestore.collection('contactos', ref => ref.where('codigo', '==', contactoFire.codigo));
    await this.contactoListRef.get().toPromise().then(doc => {
      doc.forEach(contactoObj => {
        let contactCodigo = contactoObj.data().codigo;
        if(contactoFire.codigo != contactCodigo){
          isCodigoContact = true;
        }
      });
      if (1 <= doc.size && isCodigoContact) {
        throw new Error("repetido");
      }else{
        const contacto = JSON.parse(JSON.stringify(contactoFire));
        return this.firestore.doc('contactos/'+contactoFire.idContacto).update(contacto);
      }
    }).catch((err) => {throw new Error(err.message);});
  }
}