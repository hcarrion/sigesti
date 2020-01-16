import { TestBed } from '@angular/core/testing';

import { FirebaseIniciativaService } from './firebase-iniciativa.service';

describe('FirebaseIniciativaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseIniciativaService = TestBed.get(FirebaseIniciativaService);
    expect(service).toBeTruthy();
  });
});
