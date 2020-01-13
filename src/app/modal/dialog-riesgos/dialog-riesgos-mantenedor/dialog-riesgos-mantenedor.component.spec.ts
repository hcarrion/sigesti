import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRiesgosMantenedorComponent } from './dialog-riesgos-mantenedor.component';

describe('DialogRiesgosMantenedorComponent', () => {
  let component: DialogRiesgosMantenedorComponent;
  let fixture: ComponentFixture<DialogRiesgosMantenedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRiesgosMantenedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRiesgosMantenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
