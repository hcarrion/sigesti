import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListaEventoComponent } from './dialog-lista-evento.component';

describe('DialogListaEventoComponent', () => {
  let component: DialogListaEventoComponent;
  let fixture: ComponentFixture<DialogListaEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListaEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
