import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogListadoStatusreportComponent } from './dialog-listado-statusreport.component';

describe('DialogListadoStatusreportComponent', () => {
  let component: DialogListadoStatusreportComponent;
  let fixture: ComponentFixture<DialogListadoStatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListadoStatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListadoStatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
