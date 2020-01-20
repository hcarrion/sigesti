import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistraSeguimientoComponent } from './dialog-registra-seguimiento.component';

describe('DialogRegistraSeguimientoComponent', () => {
  let component: DialogRegistraSeguimientoComponent;
  let fixture: ComponentFixture<DialogRegistraSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistraSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistraSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
