import { TestBed } from '@angular/core/testing';

import { FileContService } from './file-cont.service';

describe('FileContService', () => {
  let service: FileContService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileContService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
