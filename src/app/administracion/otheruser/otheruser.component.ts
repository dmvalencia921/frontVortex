import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario, Usuario } from '../../model/usuario';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilities } from '../../util/utilities';

@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrl: './otheruser.component.scss',
  providers: [MessageService]
})
export class OtheruserComponent implements OnInit {

  displayEditarUsuario : boolean = false;

  listUsuario ?: Usuario []=[];
  newUsuario: IUsuario = new Usuario();
  usuario?: IUsuario;

  mensaje = Utilities;
    
  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
  ){}

  fg = new FormGroup({
    nombres: new FormControl('', [
      Validators.required
    ]),
    apellidos: new FormControl('', [
      Validators.required
    ]),
    telefono: new FormControl('', [
      Validators.required
    ]),    
    usuario: new FormControl('', [
      Validators.required
    ]),     
    activo: new FormControl(false),
  });

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario(){
    this.usuarioService.listarUsuarios().subscribe({
      next:(datausuario)=>{
        this.listUsuario= datausuario;
      }
    })
  }

  abrirEditarModal(usuario: Usuario) {
    this.fg.reset();
    this.newUsuario = { ...usuario };
    this.fg?.get('nombres')?.setValue(usuario.nombres!);
    this.fg?.get('apellidos')?.setValue(usuario.apellidos!);
    this.fg?.get('telefono')?.setValue(usuario.telefono!);
    this.fg?.get('usuario')?.setValue(usuario.usuario!);   
    this.fg?.get('activo')?.setValue(usuario.activo!);

    this.displayEditarUsuario=true;
    
  }

  editarUsuario() {
    this.newUsuario.nombres=this.fg?.get('nombres')?.value!;
    this.newUsuario.apellidos=this.fg?.get('apellidos')?.value!;
    this.newUsuario.usuario=this.fg?.get('usuario')?.value!;
    this.newUsuario.activo = this.getActivoValue()!;

    if (this.fg.valid) {
      this.usuarioService.actualizarUsuario(this.newUsuario).subscribe({
        next: datalistausuario => {
          this.messageService.add({
            severity: 'success',
            detail: 'Registro actualizado con éxito',
          });
          this.usuario = datalistausuario;
          this.listarUsuario();
          this.cerrarEditarModal();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'El registro ingresado ya existe',
          });
        },
      });
    } else {
      this.mensaje.mensajeError("Error al editar","Es necesario completar todos los campos del formulario para editar.");
    }


  }
  cerrarEditarModal(): void {
    this.displayEditarUsuario = false;

  }

  getActivoValue(): boolean {
    return !!this.fg?.get('activo')?.value;
  }
  getAdminValue(): boolean {
    return !!this.fg?.get('admin')?.value;
  }
  getSeverity(esActivo: boolean): 'success' | 'danger' {
    return esActivo ? 'success' : 'danger';
  }

}
