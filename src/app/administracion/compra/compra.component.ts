import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionService } from '../../services/funcion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.scss'
})
export class CompraComponent implements OnInit{

  displayCrearcompra : boolean = false;

  fg = new FormGroup({
    total: new FormControl(0,
      Validators.required
    )

  })

constructor(
  private funcioService : FuncionService,
  private route : ActivatedRoute
){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id = params.get('id');
      this.listarFuncion(id);
    });
  }

//Seguimos con las fallas
  listarFuncion(idProyecto : any){
    this.funcioService.buscarPorIdPelicula(Number(idProyecto)).subscribe({
      next: (datafuncion)=>{
        this.displayCrearcompra=true;
      }
    })
  }

}
