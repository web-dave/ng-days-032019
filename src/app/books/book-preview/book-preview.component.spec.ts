import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPreviewComponent } from './book-preview.component';
import { mockBooks } from '../shared/mocks/mock.book.service';
import { IBook } from '../shared/costum-types';

describe('BookPreviewComponent', () => {
  let component: BookPreviewComponent;
  let fixture: ComponentFixture<BookPreviewComponent>;
  let compiled: HTMLElement;
  const book: IBook = mockBooks[0];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the Book Title', () => {
    component.book = book;
    fixture.detectChanges();
    const t = compiled.querySelector('li').innerText;
    expect(t).toBe(book.title);
  });

  it('should emit the book', done => {
    let expectedBook: IBook;
    component.book = book;
    fixture.detectChanges();
    component.bookselected.subscribe(b => {
      expectedBook = b;
      expect(expectedBook).toBe(book);
      done();
    });
    const btn = compiled.querySelector('.btn-info') as HTMLButtonElement;
    btn.click();
  });
});
