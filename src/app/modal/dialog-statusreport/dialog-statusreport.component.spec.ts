import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStatusreportComponent } from './dialog-statusreport.component';

describe('DialogStatusreportComponent', () => {
  let component: DialogStatusreportComponent;
  let fixture: ComponentFixture<DialogStatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
