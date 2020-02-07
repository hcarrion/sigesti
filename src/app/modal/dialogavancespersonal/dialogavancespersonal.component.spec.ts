import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogavancespersonalComponent } from './dialogavancespersonal.component';

describe('DialogavancespersonalComponent', () => {
  let component: DialogavancespersonalComponent;
  let fixture: ComponentFixture<DialogavancespersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogavancespersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogavancespersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
