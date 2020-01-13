import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeguimientoComponent } from './dialog-seguimiento.component';

describe('DialogSeguimientoComponent', () => {
  let component: DialogSeguimientoComponent;
  let fixture: ComponentFixture<DialogSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
