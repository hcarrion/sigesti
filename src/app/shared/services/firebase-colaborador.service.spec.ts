import { TestBed } from '@angular/core/testing';

import { FirebaseColaboradorService } from './firebase-colaborador.service';

describe('FirebaseColaboradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseColaboradorService = TestBed.get(FirebaseColaboradorService);
    expect(service).toBeTruthy();
  });
});
