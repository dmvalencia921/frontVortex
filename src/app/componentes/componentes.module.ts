import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra/compra.component';



@NgModule({
  declarations: [
    CompraComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CompraComponent
  ]
})
export class ComponentesModule { }
