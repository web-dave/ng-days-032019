import {
  Directive,
  Input,
  HostListener,
  OnChanges,
  ElementRef
} from '@angular/core';
import { IBook } from './costum-types';

@Directive({
  selector: '[appOrderBtn]'
})
export class OrderBtnDirective implements OnChanges {
  orderBtnElement: HTMLButtonElement = document.createElement('button');

  @Input() appOrderBtn: IBook;

  ngOnChanges() {
    this.orderBtnElement.innerText = 'Kauf mich!';
  }

  @HostListener('mouseenter') onMouseEnter() {
    // console.log('mouseenter');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // console.log('mouseleave');
  }

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.appendChild(this.orderBtnElement);
    this.orderBtnElement.onclick = () => {
      console.log('this.orderBtn:', this.appOrderBtn);
    };
  }
}
