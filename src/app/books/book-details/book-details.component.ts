import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/book.service';
import { IBook } from '../shared/costum-types';
import { mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<IBook>;
  n = 42;
  constructor(private route: ActivatedRoute, private service: BookService) {}

  foo(book) {
    console.log('Foo', this.n);
    return this.n;
  }

  ngOnInit() {
    this.book$ = this.route.params.pipe(
      mergeMap(params => this.service.getBook(params.isbn))
    );
    setInterval(() => {
      this.n = 42;
    }, 1500);
  }
}
