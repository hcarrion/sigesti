import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMonitorRecursoComponent } from './dialog-monitor-recurso.component';

describe('DialogMonitorRecursoComponent', () => {
  let component: DialogMonitorRecursoComponent;
  let fixture: ComponentFixture<DialogMonitorRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMonitorRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMonitorRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
