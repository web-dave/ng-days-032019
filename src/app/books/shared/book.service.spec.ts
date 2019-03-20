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
      service.getBooks().subscribe(books => {
        expect(books).toBe(mockBooks);
      });

      // Wait for the call and response with mockdata  `.flush()`
      backend
        .expectOne(service.restRoot)
        .flush(mockBooks, { status: 200, statusText: 'Ok' });
    }
  ));

  it('should return one specific book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      service
        .getBook('Moin')
        .subscribe(b => expect(b.isbn).toBe(mockBooks[0].isbn));
      const req = backend.expectOne(`${service.restRoot}/Moin`);

      expect(req.request.method).toBe('GET');
      req.flush(mockBooks[0]);
    }
  ));

  it('should update a book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      const book = { ...mockBooks[0] };
      book.title = 'Moin';
      service.updateBook(book).subscribe(b => expect(b.title).toBe('Moin'));
      const req = backend.expectOne(`${service.restRoot}/${book.isbn}`);

      expect(req.request.method).toBe('PUT');
      req.flush(book);
    }
  ));

  it('should create a new book', inject(
    [BookService, HttpTestingController],
    (service: BookService, backend: HttpTestingController) => {
      const book = new Book();
      book.title = 'Moin';
      service.createBook(book).subscribe(b => expect(b.title).toBe('Moin'));
      const req = backend.expectOne(`${service.restRoot}`);

      expect(req.request.method).toBe('POST');
      req.flush(book);
    }
  ));
});
