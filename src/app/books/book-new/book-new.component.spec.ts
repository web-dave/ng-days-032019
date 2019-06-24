import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MockBooksService } from './../shared/mocks/mock.book.service';
import { BookService } from '../shared/book.service';

import { BookNewComponent } from './book-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('BookNewComponent', () => {
  let component: BookNewComponent;
  let fixture: ComponentFixture<BookNewComponent>;
  let compiled: HTMLElement;
  let mySpy;
  let mySpy2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: BookService, useClass: MockBooksService }]
    }).compileComponents();
    const service = TestBed.get(BookService);
    const router = TestBed.get(Router);
    mySpy = spyOn(service, 'createBook').and.callThrough();
    mySpy2 = spyOn(router, 'navigate');
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  }));

  // Tip: This tests based on reactive-forms, take a look at the BookNew Class (form attribute)
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when initialized', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should require title otherwise mark title as invalid', () => {
    expect(component.form.get('title').hasError('required')).toBeTruthy();
    component.form.setValue({
      title: 'Moin',
      isbn: '',
      publisher: {
        url: '',
        name: ''
      }
    });
    expect(component.form.get('title').hasError('required')).toBeFalsy();
  });

  it('should be valid if all values are valid', () => {
    component.form.setValue({
      title: 'Moin123456',
      isbn: '123456',
      publisher: {
        url: 'url',
        name: 'äldrigaj'
      }
    });
    expect(component.form.valid).not.toBeFalsy();
  });

  it('should call service.createBook on submit', () => {
    component.form.setValue({
      title: 'Moin123456',
      isbn: '123456',
      publisher: {
        url: 'url',
        name: 'äldrigaj'
      }
    });
    fixture.detectChanges();
    const btn = compiled.querySelector('button');
    btn.click();
    expect(mySpy).toHaveBeenCalled();
  });
});
