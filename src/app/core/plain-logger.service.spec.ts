import { TestBed } from '@angular/core/testing';

import { PlainLoggerService } from './plain-logger.service';

describe('PlainLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlainLoggerService = TestBed.get(PlainLoggerService);
    expect(service).toBeTruthy();
  });
});
