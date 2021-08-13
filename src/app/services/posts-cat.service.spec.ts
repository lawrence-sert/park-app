import { TestBed } from '@angular/core/testing';

import { PostsCatService } from './posts-cat.service';

describe('PostsCatService', () => {
  let service: PostsCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
