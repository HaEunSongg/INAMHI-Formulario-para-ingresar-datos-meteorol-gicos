import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './formlist-routing.module';
import { LayoutComponent } from './layout.component';
import { FormListComponent } from './formlist.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        FormListComponent,
        AddEditComponent,

    ]
})
export class FormsListModule { }
