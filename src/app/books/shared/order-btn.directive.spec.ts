import { OrderBtnDirective } from './order-btn.directive';
import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// tslint:disable:max-line-length

@Component({
  selector: 'app-foo',
  template: '<div [appOrderBtn]=book></div>'
})
export class FooComponent {
  book = {
    title: 'REST und HTTPS',
    subtitle: 'Entwicklung und Integration nach dem Architekturstil des Web',
    isbn: '978-3-86490-120-1',
    abstract:
      'Das Buch bietet eine theoretisch fundierte, vor allem aber praxistaugliche Anleitung zum professionellen Einsatz von RESTful HTTP. Es beschreibt den Architekturstil REST (Representational State Transfer) und seine Umsetzung im Rahmen der Protokolle des World Wide Web (HTTP, URIs und andere).',
    numPages: 330,
    author: 'Stefan Tilkov / Martin Eigenbrodt / Silvia Schreier / Oliver Wolf',
    publisher: {
      name: 'dpunkt.verlag',
      url: 'http://dpunkt.de/'
    },
    id: '978-3-86490-120-1'
  };
}

describe('OrderBtnDirective', () => {
  let component: FooComponent;
  let fixture: ComponentFixture<FooComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooComponent, OrderBtnDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create an comp instance', () => {
    expect(component).toBeTruthy();
  });
  it('should create a button with lable "Kauf mich!"', () => {
    expect(false).toBeTruthy();
  });
  it('should log to console', () => {
    expect(false).toBeTruthy();
  });
});
