import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistraContactoComponent } from './dialog-registra-contacto.component';

describe('DialogRegistraContactoComponent', () => {
  let component: DialogRegistraContactoComponent;
  let fixture: ComponentFixture<DialogRegistraContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistraContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistraContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
