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

describe('BookNewComponent', () => {
  let component: BookNewComponent;
  let fixture: ComponentFixture<BookNewComponent>;
  let mySpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: BookService, useClass: MockBooksService }]
    }).compileComponents();
    const service = TestBed.get(BookService);
    mySpy = spyOn(service, 'createBook').and.callThrough();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
      title: '1234567',
      isbn: '',
      publisher: {
        name: '',
        url: ''
      }
    });
    expect(component.form.get('title').hasError('required')).toBeFalsy();
  });

  it('should be valid if all values are valid', () => {
    component.form.setValue({
      title: '1234567',
      isbn: '666666666',
      publisher: {
        name: 'Moiiiiiiin',
        url: 'öldsigfjälrsdg'
      }
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('should call service.createBook on submit', inject([BookService], () => {
    component.form.setValue({
      title: '1234567',
      isbn: '666666666',
      publisher: {
        name: 'Moiiiiiiin',
        url: 'öldsigfjälrsdg'
      }
    });
    component.saveBook();
    expect(mySpy).toHaveBeenCalled();
  }));
});
