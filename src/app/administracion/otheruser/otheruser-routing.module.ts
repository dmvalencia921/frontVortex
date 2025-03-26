import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtheruserComponent } from './otheruser.component';

const routes: Routes = [{ path: '', component: OtheruserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtheruserRoutingModule { }
