import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'list-student',
    component: ListStudentComponent,
  },
  {
    path: '',
    redirectTo: 'list-student',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
