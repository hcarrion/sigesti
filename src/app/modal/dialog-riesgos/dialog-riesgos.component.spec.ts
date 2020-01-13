import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRiesgosComponent } from './dialog-riesgos.component';

describe('DialogRiesgosComponent', () => {
  let component: DialogRiesgosComponent;
  let fixture: ComponentFixture<DialogRiesgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRiesgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
