import { TestBed } from '@angular/core/testing';

import { FirebaseStatusreportService } from './firebase-statusreport.service';

describe('FirebaseStatusreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseStatusreportService = TestBed.get(FirebaseStatusreportService);
    expect(service).toBeTruthy();
  });
});
