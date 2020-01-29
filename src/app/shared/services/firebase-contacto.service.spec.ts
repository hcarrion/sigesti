import { TestBed } from '@angular/core/testing';

import { FirebaseContactoService } from './firebase-contacto.service';

describe('FirebaseContactoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseContactoService = TestBed.get(FirebaseContactoService);
    expect(service).toBeTruthy();
  });
});
