import {Component, Directive, Pipe, Input, Output, EventEmitter, PipeTransform} from '@angular/core'

@Component({
 template: '',
 selector: 'dummy'
})
export class DummyComponent {}

@Directive({
 selector: '[orderBtn]'
})
export class OrderBtnDirective {}

@Component({
 template: '',
 selector: 'book-preview'
})
export class BookPreviewComponent {
 @Input() book: any;
 @Output() bookselected = new EventEmitter<any>();
}

@Pipe({
 name: 'pages'
})
export class PagesPipe implements PipeTransform {
 transform(any) { return any }
}
