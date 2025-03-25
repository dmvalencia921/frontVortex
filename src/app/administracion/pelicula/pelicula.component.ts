import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PeliculaService } from '../../services/pelicula.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPelicula, Pelicula } from '../../model/pelicula';
import { Utilities } from '../../util/utilities';
import { log } from 'console';
import Swal from 'sweetalert2';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.scss',
  providers: [MessageService]
})
export class PeliculaComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  imagenPreview: string | null = null;

  listPeliculas: IPelicula[] = [];
  pelicula?: IPelicula;
  newPelicula?: Pelicula = new Pelicula;
  mostrarUploader: boolean = false;

  nombreArchivo?: string;

  displayCrearPelicula: boolean = false;
  displayEditarPelicula: boolean = false;

  mensaje = Utilities;

  opcionSeleccionada: any = null;

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

  constructor(
    private messageService: MessageService,
    private peliculaService: PeliculaService
  ) { }

  fg = new FormGroup({
    titulo: new FormControl('', [
      Validators.required
    ]),
    sinopsis: new FormControl('', [
      Validators.required,
      Validators.maxLength(999)
    ]),
    duracion: new FormControl(0, [
      Validators.required
    ]),
    genero: new FormControl('', [
      Validators.required
    ]),
    image: new FormControl('', [
      Validators.required
    ]),

  })

  ngOnInit(): void {
    this.listarPeliculas();
  }

  listarPeliculas() {
    this.peliculaService.listarPelicula().subscribe({
      next: (datapelicula) => {
        this.listPeliculas = datapelicula;
      },
      error: (dataerror) => {
        this.listPeliculas = [];
        console.log(dataerror)
      }
    });
  }


  abrirCrearModal() {
    this.fg.reset();
    this.newPelicula = new Pelicula();
    this.displayCrearPelicula = true;

    this.mostrarUploader = false;
    setTimeout(() => {
      this.mostrarUploader = true;
    }, 10);
  }

  abrirEditarModal(pelicula: Pelicula) {
    this.fg.reset();
    this.newPelicula = { ...pelicula };
    this.fg?.get('titulo')?.setValue(pelicula.titulo!);
    this.fg?.get('sinopsis')?.setValue(pelicula.sinopsis!);
    this.fg?.get('duracion')?.setValue(pelicula.duracion!);
    this.fg?.get('genero')?.setValue(pelicula.genero!);

    // Cargar la imagen en la vista previa
    this.imagenPreview = pelicula.imagen ? pelicula.imagen : null;

    this.displayEditarPelicula = true;

    // Limpia el fileUpload para que el usuario pueda cambiar la imagen si quiere
    setTimeout(() => {
      this.fileUploader.clear();
    }, 10);
    this.displayEditarPelicula = true;
  }

  crearPelicula() {
    this.newPelicula!.titulo = this.fg?.get('titulo')?.value!;
    this.newPelicula!.sinopsis = this.fg?.get('sinopsis')?.value!;
    this.newPelicula!.duracion = this.fg?.get('duracion')?.value!;
    this.newPelicula!.genero = this.fg?.get('genero')?.value!;
    this.newPelicula!.imagen = this.fg?.get('image')?.value!;

    console.log("LO QUE VOY A GUARDAR ", this.newPelicula);

    if (this.fg.valid) {
      this.peliculaService.crearPelicula(this.newPelicula!).subscribe({
        next: (datapelicula) => {
          this.messageService.add({
            severity: 'success',
            summary: 'CONFIRMACIÓN',
            detail: 'Registro creado con éxito',
          });
          this.pelicula = datapelicula;
          this.cerrarCrearModal();
          this.listarPeliculas();
        },
        error: (dataerror) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'El registro ingresado ya existe',
          });
        },
      });
      this.displayCrearPelicula = false;
    } else {
      this.mensaje.mensajeError("Error al crear", "Es necesario completar todos los campos del formulario para crear.");
    }
  }
  editarPelicula() {
    this.newPelicula!.titulo = this.fg?.get('titulo')?.value!;
    this.newPelicula!.sinopsis = this.fg?.get('sinopsis')?.value!;
    this.newPelicula!.duracion = this.fg?.get('duracion')?.value!;
    this.newPelicula!.genero = this.fg?.get('genero')?.value!;
    this.newPelicula!.imagen = this.fg?.get('image')?.value!;
    
    if (this.fg.valid) {
      this.peliculaService.actualizarPelicula(this.newPelicula!).subscribe({
        next: (datapelicula) => {
          this.messageService.add({
            severity: 'success',
            summary: 'CONFIRMACIÓN',
            detail: 'Registro creado con éxito',
          });
          this.listPeliculas != datapelicula;
          this.cerrarEditarModal();
          this.listarPeliculas();
        },
        error: (dataerror) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'El registro ingresado ya existe',
          });
        },
      });
      this.displayEditarPelicula = false;
    } else {
      this.mensaje.mensajeError("Error al Editar", "Es necesario completar todos los campos del formulario para crear.");
    }
  }


  onUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.nombreArchivo = file.name;
      const filePath = `../assets/portadas/${file.name}`;
      this.fg.patchValue({ image: filePath });
    }
  }

  onUploadEditar(event: any) {
    const file = event.files[0];
    if (file) {
      this.nombreArchivo = file.name;
      const filePath = `../assets/portadas/${file.name}`;
      this.fg.patchValue({ image: filePath });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  eliminar(event: any) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará permanentemente la pelicula. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26670f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.peliculaService.eliminarPelicula(event.idPelicula).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminación exitosa!",
              text: "El dato seleccionado ha sido eliminado correctamente.",
              icon: "success"
            });
            this.listarPeliculas();
          }
        });
      }
    });

  }


  abrirModal(opcion: any, facultad: IPelicula) {

    switch (opcion.nombre) {
      case 'Editar':
        this.abrirEditarModal(facultad);
        break;
      case 'Eliminar':
        console.log("entre en eliminar");

        this.eliminar(facultad);
        break;
      default:
        break;

    }
    setTimeout(() => {
      this.opcionSeleccionada = null;
    }, 0)

  }

  //----cerrar modales--//
  cerrarCrearModal(): void {
    this.displayCrearPelicula = false;
  }

  cerrarEditarModal(): void {
    this.displayEditarPelicula = false;
  }
}
