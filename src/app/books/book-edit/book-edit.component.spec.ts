import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditComponent } from './book-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBooksService } from './../shared/mocks/mock.book.service';
import { BookService } from '../shared/book.service';
import { fakeAsync, tick } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import {} from 'rxjs/operators';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let compiled;
  let service: MockBooksService;
  let mySpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ isbn: 'Moin' }), snapshot: {} }
        },
        { provide: BookService, useClass: MockBooksService }
      ]
    }).compileComponents();
    service = TestBed.get(BookService);
    mySpy = spyOn(service, 'updateBook').and.callThrough();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement as HTMLElement;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should validate that title is required and show an error message', fakeAsync(() => {
    const title = compiled.querySelector('[name="title"]');
    title.value = '';
    title.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    expect(compiled.querySelector('[name="title"].ng-invalid')).toBeTruthy();
  }));

  it('should submit the book on click on the submit button', () => {
    const btn = compiled.querySelector('.btn-success');
    btn.click();
    expect(mySpy).toHaveBeenCalledWith(component.book);
  });
});
