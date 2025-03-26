import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ComponentesModule } from "../../componentes/componentes.module";
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    ComponentesModule,
    InputNumberModule
]
})
export class InicioModule { }
