import { Component, OnInit, ViewChild } from '@angular/core';
import { IBook } from '../shared/costum-types';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../shared/book.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  @ViewChild('myForm') form;
  book: IBook;
  constructor(
    private route: ActivatedRoute,
    private service: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(mergeMap(params => this.service.getBook(params.isbn)))
      .subscribe(b => (this.book = b));
  }
  saveBook() {
    this.service.updateBook(this.book).subscribe();
  }

  validate(valid: boolean) {
    if (!valid) {
      // console.log(this.form.nativeElement.querySelector('input.ng-invalid'));
      // this.form.nativeElement.querySelector('input.ng-invalid').focus();
    }
  }
}
