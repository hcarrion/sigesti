import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistraRecursoEventoComponent } from './dialog-registra-recurso-evento.component';

describe('DialogRegistraRecursoEventoComponent', () => {
  let component: DialogRegistraRecursoEventoComponent;
  let fixture: ComponentFixture<DialogRegistraRecursoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistraRecursoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistraRecursoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
