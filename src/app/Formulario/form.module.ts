import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormRoutingModule],
  declarations: [FormComponent],
})
export class UsersModule {}
