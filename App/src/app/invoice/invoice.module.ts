import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../shared/material.moduel';


@NgModule({
  declarations: [
    InvoiceAddComponent,
    InvoiceDetailsComponent,
    InvoiceEditComponent,
    InvoiceListComponent,
  ],
  imports: [InvoiceRoutingModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class InvoiceModule { }
