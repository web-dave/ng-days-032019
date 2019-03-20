import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BookDetailsComponent } from './book-details.component';
import { MockBooksService, mockBooks } from '../shared/mocks/mock.book.service';
import { BookService } from '../shared/book.service';
import { PagesPipe } from '../shared/mocks/mock.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let service: BookService;
  let mySpy;
  const book = mockBooks[0];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent, PagesPipe],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ isbn: book.isbn }), snapshot: {} }
        }
      ]
    }).compileComponents();
    service = TestBed.get(BookService);
    mySpy = spyOn(service, 'getBook').and.returnValue(of(book));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the BookData service with the correct ISBN', () => {
    expect(mySpy).toHaveBeenCalledWith(book.isbn);
  });
});
