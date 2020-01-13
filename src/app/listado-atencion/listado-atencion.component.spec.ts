import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAtencionComponent } from './listado-atencion.component';

describe('ListadoAtencionComponent', () => {
  let component: ListadoAtencionComponent;
  let fixture: ComponentFixture<ListadoAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
