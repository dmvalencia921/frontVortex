import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Funcion, IFuncion } from '../../model/funcion';
import { FuncionService } from '../../services/funcion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPelicula, Pelicula } from '../../model/pelicula';
import { Utilities } from '../../util/utilities';
import { PeliculaService } from '../../services/pelicula.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrl: './funcion.component.scss',
  providers: [MessageService]
})
export class FuncionComponent implements OnInit {

  listfunciones: IFuncion[] = [];
  listPeliculas: IPelicula[] = [];
  funcion?: IFuncion;
  newFuncion?: Funcion = new Funcion;


  peliculaSeleccionada?: Pelicula;
  seleccionaHora?:string ;

  displayCrearFuncion: boolean = false;
  displayEditarFuncion: boolean = false;

  mensaje = Utilities;

  opcionSeleccionada: any = null;

  listaTiempos = [
    { label: '8:00 AM - 10:00 AM', value: 1 },
    { label:  '10:00 AM - 12:00 PM', value: 2 },
    { label: '12:00 PM - 2:00 PM', value: 3 },
    { label: '2:00 PM - 4:00 PM', value: 4 },
    { label: '4:00 PM - 6:00 PM', value: 5 },
    { label:  '7:00 PM - 9:00 PM', value: 6 },
  ];
 

  listaOpciones = [
    {
      icono: 'pi pi-pen-to-square',
      nombre: 'Editar'
    },
    {
      icono: 'pi pi-trash',
      nombre: 'Eliminar'
    }

  ];


  fg = new FormGroup({
    sala: new FormControl('', [
      Validators.required
    ]),
    fecha: new FormControl('', [
      Validators.required
    ]),
    hora: new FormControl('', [
      Validators.required
    ]),
    precio: new FormControl(0, [
      Validators.required,
    ]),
    peli: new FormControl(0, [Validators.required])
  })

  constructor(
    private peliculaService: PeliculaService,
    private messageService: MessageService,
    private funcionService: FuncionService
  ) { }

  ngOnInit(): void {
    this.listarPeliculas();
    this.listarFuncion();
  }

  // ---- Metodos de listar ---- //
  listarFuncion() {
    this.funcionService.listarFuncion().subscribe({
      next: (datafuncion) => {
          this.listfunciones = datafuncion;   
      },
      error: (dataerror) => {
        console.log(dataerror)
      }
    });
  }

  listarPeliculas() {
    this.peliculaService.listarPelicula().subscribe({
      next: (datapelicula) => {
        this.listPeliculas = datapelicula
      },
      error: (dataerror) => {
        console.log(dataerror)
      }
    });
  }

  buscarPelicula(pelicula: IPelicula) {
    this.peliculaSeleccionada = pelicula;
  }


  asignarHoras(horas : string){
    this.seleccionaHora = horas;
  }

  abrirModal(opcion: any, funcion: IFuncion) {

    switch (opcion.nombre) {
      case 'Editar':
        this.abrirEditarModal(funcion);
        break;
      case 'Eliminar':
        console.log("entre en eliminar");

        this.eliminar(funcion);
        break;
      default:
        break;

    }
    setTimeout(() => {
      this.opcionSeleccionada = null;
    }, 0)

  }
  abrirCrearModal() {
    this.fg.reset();
    this.newFuncion = new Funcion();
    this.displayCrearFuncion = true;
  }

  abrirEditarModal(funcion: Funcion) {
    let fecha = moment(this.newFuncion?.fecha).utc().format('YYYY-MM-DD');
    this.fg.reset();
    this.newFuncion = { ...funcion };
    this.fg.get('sala')?.setValue(funcion.sala!);
    this.fg.get('fecha')?.setValue(fecha);
    this.fg.get('hora')?.setValue(funcion.horas!);
    this.fg.get('precio')?.setValue(funcion.precio!);
    this.fg.get('peli')?.setValue(funcion.pelicula?.idPelicula!);
    this.displayEditarFuncion = true;
  }

  crearFuncion() {

    this.newFuncion!.sala = this.fg.get('sala')?.value!;
    this.newFuncion!.fecha = new Date(this.fg.get('fecha')?.value!);
    this.newFuncion!.horas=  this.seleccionaHora;
    this.newFuncion!.precio = Number(this.fg.get('precio')?.value!);
    this.newFuncion!.pelicula = this.peliculaSeleccionada;


    if (this.fg.valid) {
      this.funcionService.crearFuncion(this.newFuncion!).subscribe({
        next: (datafuncion) => {
          this.messageService.add({
            severity: 'success',
            summary: 'CONFIRMACIÓN',
            detail: 'Registro creado con éxito',
          });
          this.funcion = datafuncion;
          this.cerrarCrearModal();
          this.listarFuncion();
        },
        error: (dataerror) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'El registro ingresado ya existe',
          });
        },
      });
      this.displayCrearFuncion = false;
    } else {
      this.mensaje.mensajeError("Error al crear", "Es necesario completar todos los campos del formulario para crear.");
    }
  }

  editarFuncion() {
    this.newFuncion!.sala = this.fg.get('sala')?.value!;
    this.newFuncion!.fecha = new Date(this.fg.get('fecha')?.value!);
    this.newFuncion!.horas = this.seleccionaHora;
    this.newFuncion!.precio = Number(this.fg.get('precio')?.value!);
    const peliculaId = this.fg.get('peli')?.value;
  
    this.newFuncion!.pelicula = this.listPeliculas.find(
      (pe)=> pe.idPelicula === peliculaId
    )!;
        console.log("la funcion al editar ", this.newFuncion);

    if (this.fg.valid) {
      this.funcionService.actualizarFuncion(this.newFuncion!).subscribe({
        next: (datafuncion) => {
          this.messageService.add({
            severity: 'success',
            summary: 'CONFIRMACIÓN',
            detail: 'Registro creado con éxito',
          });
          this.listfunciones != datafuncion;
          this.cerrarEditarModal();
          this.listarFuncion();
        },
        error: (dataerror) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'El registro ingresado ya existe',
          });
        },
      });
      this.displayEditarFuncion = false;
    } else {
      this.mensaje.mensajeError("Error al Editar", "Es necesario completar todos los campos del formulario para crear.");
    }
  }

  // getCamposInvalidos() {
  //   const camposInvalidos = Object.keys(this.fg.controls).filter(campo =>
  //     this.fg.get(campo)?.invalid
  //   );
  //   console.log("Campos inválidos:", camposInvalidos);
  //   return camposInvalidos;
  // }

  eliminar(event:any){
 Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará permanentemente la función. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26670f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionService.eliminarFuncion(event.idFuncion).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminación exitosa!",
              text: "El dato seleccionado ha sido eliminado correctamente.",
              icon: "success"
            });
            this.listarFuncion();
          }
        });
      }
    });
  }

  //----cerrar modales--//
  cerrarCrearModal(): void {
    this.displayCrearFuncion = false;
  }

  cerrarEditarModal(): void {
    this.displayEditarFuncion = false;
  }
}
