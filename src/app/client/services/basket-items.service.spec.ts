import { TestBed } from '@angular/core/testing';

import { BasketItemsService } from './basket-items.service';

describe('BasketItemsService', () => {
  let service: BasketItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
