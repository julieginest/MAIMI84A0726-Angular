import { TestBed } from '@angular/core/testing';

import { CommuniquesService } from './communiques.service';

describe('CommuniquesService', () => {
  let service: CommuniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
