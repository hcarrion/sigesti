import { TestBed } from '@angular/core/testing';

import { FirebaseParametroService } from './firebase-parametro.service';

describe('FirebaseParametroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseParametroService = TestBed.get(FirebaseParametroService);
    expect(service).toBeTruthy();
  });
});
