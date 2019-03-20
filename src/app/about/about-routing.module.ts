import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { LeaveGuard } from '../books/shared/leave.guard';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    canDeactivate: [LeaveGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
