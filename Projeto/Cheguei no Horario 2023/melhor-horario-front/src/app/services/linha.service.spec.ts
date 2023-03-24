import { TestBed } from '@angular/core/testing';

import { LinhaService } from './linha.service';

describe('LinhaService', () => {
  let service: LinhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
