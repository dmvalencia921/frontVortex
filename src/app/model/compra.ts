import { Funcion } from "./funcion";
import { Usuario } from "./usuario";

export interface ICompra{
    idCompra ?: number
    total ?: number;
    asientos ?: number;
    funcion ?: Funcion;
    usuario ?: Usuario;   
}


export class Compra implements ICompra{
    idCompra ?: number
    total ?: number;
    asientos ?: number;
    funcion ?: Funcion;
    usuario ?: Usuario;
}