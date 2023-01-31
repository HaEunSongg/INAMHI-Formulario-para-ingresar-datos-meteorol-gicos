import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { FormComponent } from './Formulario/form.component';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
  const formModule = () =>
  import('./Formulario/form.module').then((x) => x.FormsModule);
  const formlistmModule = () =>
  import('./formlist/formlist.module').then((x) => x.FormsListModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'form', component: FormComponent,  canActivate: [AuthGuard] },
  { path: 'viewprog', loadChildren: formlistmModule, canActivate: [AuthGuard] },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
