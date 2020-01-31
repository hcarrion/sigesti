import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficobarComponent } from './graficobar.component';

describe('GraficobarComponent', () => {
  let component: GraficobarComponent;
  let fixture: ComponentFixture<GraficobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
