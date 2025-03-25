import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IUsuario, Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
  providers: [MessageService],
})
export class UsuarioComponent  {

  usuario ?: IUsuario;
  newUsuario?: Usuario = new Usuario;


  constructor(
    private usuarioService : UsuarioService,
    private router: Router
  ){}

  fg= new FormGroup({
    nombres: new FormControl('',[
      Validators.required,
    ]),
    apellidos: new FormControl('',[
      Validators.required
    ]),
    usuario: new FormControl('',[
      Validators.required
    ]),
    clave: new FormControl('',[
      Validators.required
    ])
  })

  crearUsuario(){
    this.newUsuario!.nombres = this.fg?.get('nombres')?.value!;
    this.newUsuario!.apellidos = this.fg?.get('apellidos')?.value!;
    this.newUsuario!.usuario = this.fg?.get('usuario')?.value!;
    this.newUsuario!.clave = this.fg?.get('clave')?.value!;
    if(this.fg.valid){
      this.usuarioService.crearUsuario(this.newUsuario!).subscribe({
        next: (datausuario) => {
          Swal.fire({
            title: "Registrado exitosamente!",
            text: "El usuario ha sido registrado exitosamente",
            icon: "success"
          });
          this.usuario= datausuario;
          this.cancelar();
        },
        error: (dataerror) => {
          Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "El usuario ya se encuentra registrado",
            footer: '<a href="/login">regresar al login</a>'
          });
          
        }
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Lo sentimos!",
        text: "El formulario debe esta lleno es su totalidad",
      });
    }
  }


  
  validarCorreoElectronico() {
    const correo = this.fg?.get('usuario')?.value!;
    if (correo != null && correo.trim() !== '') {
      const validarCorreo = this.fg?.get('usuario') ?.value!.includes('@gmail.com') 
      || this.fg?.get('usuario') ?.value!.includes('@hotmail.com')
      ||this.fg?.get('usuario') ?.value!.includes('@yahoo.com')
      ||this.fg?.get('usuario') ?.value!.includes('@outlook.com')
      if (!validarCorreo) {
        return true;
      } else {
        return false;
      }
    }
    return null;
  }

  cancelar(){
    this.router.navigate(['/login']);
  }
}
