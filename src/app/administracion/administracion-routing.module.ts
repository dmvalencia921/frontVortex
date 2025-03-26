import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'pelicula', loadChildren: () => import('./pelicula/pelicula.module').then(m => m.PeliculaModule) },
  { path: 'funcion', loadChildren: () => import('./funcion/funcion.module').then(m => m.FuncionModule) },
  { path: 'otheruser', loadChildren: () => import('./otheruser/otheruser.module').then(m => m.OtheruserModule) },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
