import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionRoutingModule } from './funcion-routing.module';
import { FuncionComponent } from './funcion.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    FuncionComponent
  ],
  imports: [
    CommonModule,
    FuncionRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
  ]
})
export class FuncionModule { }
