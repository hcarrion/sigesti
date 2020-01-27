import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistraEventoComponent } from './dialog-registra-evento.component';

describe('DialogRegistraEventoComponent', () => {
  let component: DialogRegistraEventoComponent;
  let fixture: ComponentFixture<DialogRegistraEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistraEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistraEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
