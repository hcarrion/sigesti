import { TestBed } from '@angular/core/testing';

import { FirebaseIniciativaMainService } from './firebase-iniciativa-main.service';

describe('FirebaseIniciativaMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseIniciativaMainService = TestBed.get(FirebaseIniciativaMainService);
    expect(service).toBeTruthy();
  });
});
