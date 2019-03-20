import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { BookService } from '../shared/book.service';
import { Subscription } from 'rxjs';
import { IBook } from '../shared/costum-types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: IBook[];
  sub = new Subscription();
  constructor(
    private service: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  selectBook(b: IBook) {
    this.router.navigate([b.isbn], { relativeTo: this.route });
  }

  ngOnInit() {
    this.sub.add(
      this.service.getBooks().subscribe(b => {
        this.books = b;
      })
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
