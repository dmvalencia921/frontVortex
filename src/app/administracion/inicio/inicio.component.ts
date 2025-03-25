import { Component, OnInit } from '@angular/core';
import { IPelicula, Pelicula } from '../../model/pelicula';
import { PeliculaService } from '../../services/pelicula.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{


  listPeliculas: IPelicula[]=[];

  constructor(
    private router : Router,
    private peliculaService : PeliculaService
  ){} 

  ngOnInit(): void {
    this.listarPeliculas();
  }


 

  listarPeliculas(){
    this.peliculaService.listarPelicula().subscribe({
      next:(datapelicula)=>{
        this.listPeliculas = datapelicula;
      },
      error:(dataerror)=>{
        console.log(dataerror)
      } 
    });
  }

  reservar(peli : Pelicula){
    this.router.navigate(['/administracion/compra', peli.idPelicula]);
    console.log("Estas alquilado esta : ", peli);
    
  }
}
