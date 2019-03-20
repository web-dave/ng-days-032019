import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../shared/book.service';
import { MockBooksService } from '../shared/mocks/mock.book.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-preview',
  template: ''
})
class FooComponent {
  @Input() book;
  @Output() bookselected = new EventEmitter();
  @Output() delete = new EventEmitter();
}
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent, FooComponent],
      providers: [
        {
          provide: BookService,
          useClass: MockBooksService
        }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 Books', async(() => {
    component.ngOnInit();
    const books = compiled.querySelectorAll('app-book-preview');
    expect(books.length).toBe(component.books.length);
  }));
});
