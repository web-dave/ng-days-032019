import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from './costum-types';
import { Book } from './Book.class';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  restRoot = 'https://bookmonkey.azurewebsites.net/books';

  constructor(private http: HttpClient) {}

  getBooks() {
    const url = this.restRoot;
    return this.http.get<IBook[]>(url);
  }
  getBook(isbn: string) {
    const url = `${this.restRoot}/${isbn}`;
    return this.http.get<IBook>(url);
  }
  updateBook(book: IBook) {
    const url = `${this.restRoot}/${book.isbn}`;
    return this.http.put<IBook>(url, book);
  }
  createBook(book: IBook) {
    const url = `${this.restRoot}`;
    return this.http.post<IBook>(url, book);
  }
  getNewBook(): IBook {
    return new Book();
  }
}
