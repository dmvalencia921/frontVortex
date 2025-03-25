export interface IPelicula{
    idPelicula?:number;
    titulo?:string;
    sinopsis?:string;
    duracion?:number;
    genero?:string;
    imagen?:string;
}

export class Pelicula implements IPelicula{
    idPelicula?:number;
    titulo?:string;
    sinopsis?:string;
    duracion?:number;
    genero?:string;
    imagen?:string;
}
