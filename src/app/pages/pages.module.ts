import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { StudentsService } from './services/students.service';
import { AlertComponent } from './alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  PagesComponent,
];
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ListStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent,
    AlertComponent
  ],
  providers:[
    StudentsService
  ],
  entryComponents : [
    AddStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent,
    AlertComponent
  ]
})
export class PagesModule {
}
