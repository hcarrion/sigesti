import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteavancesComponent } from './reporteavances.component';

describe('ReporteavancesComponent', () => {
  let component: ReporteavancesComponent;
  let fixture: ComponentFixture<ReporteavancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteavancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteavancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
