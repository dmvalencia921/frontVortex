import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra/compra.component';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    CompraComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule
  ],
  exports:[
    CompraComponent
  ]
})
export class ComponentesModule { }
