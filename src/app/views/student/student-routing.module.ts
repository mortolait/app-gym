import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStudentComponent } from './new-student/new-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list',
    pathMatch:'full',
    data: {
      title: 'Aluno'
    }
  },
  {
    path: 'list',
    component: ListStudentComponent,
    data: {
      title: 'Lista'
    }
  },
  {
    path: 'new',
    component: NewStudentComponent,
    data: {
      title: 'Novo'
    }
  },
  {
    path: ':id',
    component: ProfileStudentComponent,
    data: {
      title: 'Perfil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
