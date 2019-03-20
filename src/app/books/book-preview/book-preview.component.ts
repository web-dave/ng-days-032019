import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewChecked
} from '@angular/core';
import { IBook } from '../shared/costum-types';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent
  implements OnInit, OnChanges, AfterViewChecked {
  @Input() book: IBook;
  @Input() trigger: number;
  @Output() bookselected = new EventEmitter<IBook>();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.book.title);
  }
  ngAfterViewChecked(): void {
    // console.log(this.book.title);
  }
  constructor() {}

  ngOnInit() {}

  selectThisBook() {
    this.bookselected.emit(this.book);
  }
}
