import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { mockBooks } from './mocks/mock.book.service';
import { Book } from './Book.class';
import { Subject } from 'rxjs';

describe('BookService', () => {
  let service: BookService;
  let backend: HttpTestingController;
  beforeEach(() => {
    // setup @ngModule for testing
    TestBed.configureTestingModule({
      providers: [BookService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(BookService);
    backend = TestBed.get(HttpTestingController);
  });

  // check after each test there is no pending(open) request
  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all books', done => {
    // call service method and test IN the subscription. no need to use async anymore!!
    service.getBooks().subscribe(bs => {
      expect(bs).toBe(mockBooks);
      done();
    });
    backend
      .expectOne('https://bookmonkey.azurewebsites.net/books')
      .flush(mockBooks);
  });

  it('should return one specific book', done => {
    service.getBook('affe').subscribe(b => {
      expect(b).toBe(mockBooks[0]);
      done();
    });
    backend
      .expectOne('https://bookmonkey.azurewebsites.net/books/affe')
      .flush(mockBooks[0]);
  });

  it('should update a book', done => {
    const book = { ...mockBooks[0] };
    book.title = 'Moin';
    service.updateBook(book).subscribe(b => {
      expect(b.title).toBe('Moin');
      done();
    });
    const req = backend.expectOne(
      'https://bookmonkey.azurewebsites.net/books/' + book.isbn
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(book);
    req.flush(req.request.body);
  });

  it('should create a new book', done => {
    const book = new Book();
    book.title = 'Moin';
    service.createBook(book).subscribe(b => {
      expect(b.title).toBe('Moin');
      done();
    });
    const req = backend.expectOne('https://bookmonkey.azurewebsites.net/books');
    expect(req.request.method).toBe('POST');
    req.flush(req.request.body);
  });
});
