import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../account/layout.component';
import { LoginComponent } from '../account/login.component';
import { RegisterComponent } from '../account/register.component';

import { ListComponent } from '../users/list.component';
import { AddEditComponent } from '../users/add-edit.component';
import { FormComponent } from './form.component';
import { FormListComponent } from '../formlist/formlist.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'form', component: FormComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent },
      { path: 'viewprog', component: FormListComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
