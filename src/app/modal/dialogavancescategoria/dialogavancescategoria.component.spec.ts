import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogavancescategoriaComponent } from './dialogavancescategoria.component';

describe('DialogavancescategoriaComponent', () => {
  let component: DialogavancescategoriaComponent;
  let fixture: ComponentFixture<DialogavancescategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogavancescategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogavancescategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
