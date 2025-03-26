import { Pelicula } from "./pelicula";

export interface IFuncion {
    idFuncion ?: number;
    sala ?:string;
    fecha ?: Date;
    horas?: string;
    precio ?: number;
    pelicula ?: Pelicula;
}


export class Funcion implements IFuncion{
    idFuncion ?: number;
    sala ?:string;
    fecha ?: Date;
    horas?: string;
    precio ?: number;
    pelicula ?: Pelicula;
}