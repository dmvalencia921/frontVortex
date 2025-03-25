export interface IUsuario {
    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    usuario?: string;
    clave?: string;
    rol?: string;
  }

  export class Usuario implements IUsuario {
    idUsuario?: number;
    nombres?: string;
    apellidos?: string;
    usuario?: string;
    clave?: string;
    rol?: string;
  }