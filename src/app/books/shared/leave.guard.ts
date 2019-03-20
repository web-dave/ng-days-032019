import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { BookNewComponent } from '../book-new/book-new.component';
import { Observable } from 'rxjs';
import { BookListComponent } from '../book-list/book-list.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard
  implements CanDeactivate<BookNewComponent | BookListComponent> {
  canDeactivate(
    component: BookNewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!component.isSaved()) {
      return confirm('R U SURE?');
    }
    return component.isSaved();
  }
}
