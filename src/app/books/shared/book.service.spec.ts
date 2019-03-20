import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { mockBooks } from './mocks/mock.book.service';
import { Book } from './Book.class';

describe('BookService', () => {
  beforeEach(() => {
    // setup @ngModule for testing
    TestBed.configureTestingModule({
      providers: [BookService],
      imports: [HttpClientTestingModule]
    });
  });

  // check after each test there is no pending(open) request
  afterEach(inject(
    [HttpTestingController],
    (backend: HttpTestingController) => {
      backend.verify();
    }
  ));

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('should return all books', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      // call service method and test IN the subscription. no need to use async anymore!!
      expect(false).toBeTruthy();
    }
  ));

  it('should return one specific book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      expect(false).toBeTruthy();
    }
  ));

  it('should update a book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      const book = { ...mockBooks[0] };
      book.title = 'Moin';
      expect(false).toBeTruthy();
    }
  ));

  it('should create a new book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      const book = new Book();
      book.title = 'Moin';
      expect(false).toBeTruthy();
    }
  ));
});
