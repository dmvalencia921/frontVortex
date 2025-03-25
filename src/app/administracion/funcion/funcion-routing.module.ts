import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionComponent } from './funcion.component';

const routes: Routes = [{ path: '', component: FuncionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionRoutingModule { }
