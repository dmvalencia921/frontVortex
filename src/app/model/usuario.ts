export interface IUsuario {
    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    usuario?: string;
    telefono ?:string;
    clave?: string;
    rol?: string;
    activo?: boolean;
    nomActivo?: string;
  }

  export class Usuario implements IUsuario {
    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    telefono ?:string;
    usuario?: string;
    clave?: string;
    rol?: string;
    activo?: boolean;
    nomActivo?: string;
  }