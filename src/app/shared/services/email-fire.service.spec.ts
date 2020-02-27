import { TestBed } from '@angular/core/testing';

import { EmailFireService } from './email-fire.service';

describe('EmailFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailFireService = TestBed.get(EmailFireService);
    expect(service).toBeTruthy();
  });
});
