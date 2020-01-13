import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIniciativaComponent } from './registro-iniciativa.component';

describe('RegistroIniciativaComponent', () => {
  let component: RegistroIniciativaComponent;
  let fixture: ComponentFixture<RegistroIniciativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroIniciativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
