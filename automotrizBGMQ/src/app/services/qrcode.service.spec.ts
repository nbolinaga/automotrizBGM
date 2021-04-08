import { TestBed } from '@angular/core/testing';

import { QRcodeService } from './qrcode.service';

describe('QRcodeService', () => {
  let service: QRcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
