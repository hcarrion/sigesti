import { Component, OnInit, NgZone, ViewChild,ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { FirestoreService } from '../services/firestore/firestore.service';
import { ParametroFire } from '../shared/models/parametro-fire';
import { FirebaseParametroService } from '../shared/services/firebase-parametro.service';

@Component({
  selector: 'app-registro-iniciativa',
  templateUrl: './registro-iniciativa.component.html',
  styleUrls: ['./registro-iniciativa.component.css'],
  encapsulation: ViewEncapsulation.None,
})



export class RegistroIniciativaComponent implements OnInit {
  
  public cats = [];
  
  panelColor = new FormControl('red');
  constructor(private _ngZone: NgZone,private firestoreService: FirestoreService, private firebaseParametros: FirebaseParametroService) { }
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() 
  {
    this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });
  }

  saveParametro(){
    const paramObject = new ParametroFire();
    paramObject.codigo = 1;
    paramObject.descripcion= 'pruebaaa';

    this.firebaseParametros.parametrarFirebase(paramObject);
  }
  

}


