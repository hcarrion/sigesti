import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccesoComponent } from './dialog-acceso.component';

describe('DialogAccesoComponent', () => {
  let component: DialogAccesoComponent;
  let fixture: ComponentFixture<DialogAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
