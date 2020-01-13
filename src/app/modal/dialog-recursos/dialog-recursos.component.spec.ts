import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecursosComponent } from './dialog-recursos.component';

describe('DialogRecursosComponent', () => {
  let component: DialogRecursosComponent;
  let fixture: ComponentFixture<DialogRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
