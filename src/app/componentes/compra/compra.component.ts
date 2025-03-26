import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../model/pelicula';
import { FuncionService } from '../../services/funcion.service';
import { Funcion } from '../../model/funcion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compra, ICompra } from '../../model/compra';
import { CompraService } from '../../services/compra.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario, Usuario } from '../../model/usuario';
import { log } from 'console';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.scss'
})
export class CompraComponent implements OnInit {

  @Input() pelicula?: Pelicula = new Pelicula();

  usuario?: IUsuario;

  funcionPelicula?: Funcion;
  dispay: boolean = false;

  compra?: ICompra;
  newCompra?: Compra = new Compra;


  fg = new FormGroup({
    valorPeli: new FormControl({ value: 0, disabled: true }),
    sillas: new FormControl(0,
      Validators.required
    )
  })

  constructor(
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    private compraService: CompraService,
    private funcionService: FuncionService
  ) { }

  ngOnInit(): void {
    this.cargarFuncion();
    this.buscarUsuarioPorUsername(this.storageService.getUserName());
  }

  buscarUsuarioPorUsername(username: string) {
    this.usuarioService.buscarUsuarioPorUserName(username).subscribe({
      next: (dataUsuario) => {
        this.usuario = dataUsuario;
      }
    })
  }

  obtenerValor() {
    let numSillas = this.fg.get('sillas')?.value;
    this.fg.get('valorPeli')?.setValue(numSillas! * this.funcionPelicula?.precio!);
  }


  cargarFuncion() {
    this.funcionService.buscarPorIdPelicula(this.pelicula?.idPelicula!).subscribe({
      next: (datfuncion) => {
        this.funcionPelicula = datfuncion;
        if (this.funcionPelicula) {
          console.log(this.funcionPelicula);

          this.dispay = true;
        }
      }
    })
  }

  crearCompra() {
    this.newCompra!.asientos = this.fg.get('sillas')?.value!;
    this.newCompra!.total = this.fg.get('valorPeli')?.value!;
    this.newCompra!.funcion = this.funcionPelicula!;
    this.newCompra!.usuario = this.usuario!;


    Swal.fire({
      title: "Deseas confirmar la compra?",
      showDenyButton: true,
      confirmButtonText: "Si",
    }).then((result) => {

      if (result.isConfirmed) {
        this.compraService.crearCompra(this.newCompra!).subscribe({
          next: (datacompra) => {
            Swal.fire({
              title: "Compra exitosa!",
              text: "Se envia comprobante de compra al correo: " + this.usuario?.usuario,
              icon: "success"
            });
          }
        })
        setTimeout(() => {
          this.cerrarModal();
        }, 2000);
      } 
    });
  }

  cerrarModal() {
    this.dispay = false;
    location.reload();
  }
}
