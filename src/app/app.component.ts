import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { StorageService } from './services/storage.service';
import { UtilConstants } from './util/util-constants';
import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vortox Bird';
  sidebarVisible: boolean = false;
  items: any[] = [];
  autenticado = false;

  nombreUsuario ?: string;
  rolUsuario ?: string;
  isadmin :boolean = false;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private storageService: StorageService
  ){}

  ngOnInit(): void {
    this.autenticado = this.storageService.autenticado();
    if(this.autenticado){
      this.buscarUsuarioPorUsername(this.storageService.getUserName());
    
        this.setupMenuItems();
    }

    
  }
  logout(): void {    
    this.storageService.borrar();
    this.router.navigateByUrl('/login');
    this.autenticado = false;
  }
  setupMenuItems(): void {

    this.items = [
      {
        label: 'Inicio',
        routerLink: 'administracion/inicio',
      },
      {
        label: 'Pelicula',
        routerLink: 'administracion/pelicula',
      },
      {
        label: 'Funciones',
        routerLink: 'administracion/funcion',
      },
    ];
  };


  buscarUsuarioPorUsername(username : string){
    this.usuarioService.buscarUsuarioPorUserName(username).subscribe({
      next:(dataUsuario)=>{
        this.isadmin = dataUsuario.rol == UtilConstants.ROL_ADMIN;  
        console.log("es asmin ", this.isadmin);
             
        this.nombreUsuario =dataUsuario.nombres + ' '+ dataUsuario.apellidos;
      }
    })
  }

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }
}
