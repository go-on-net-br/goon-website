import { Media } from "./common";

export interface Corporativo {
  Titulo: string;
  Corpo: string;
}

export interface Contato {
  Destinatario: string;
  email: string;
}

export interface Pilares {
  Titulo: string;
  Imagem: Media;
  Corpo: string;
}

export interface Revendas {
  Titulo: string;
  Foto: Media;
  Corpo: string;
}

export interface Carrossel {
  URL?: string;
  Midia: Media;
  Titulo: string;
}

export interface SecaoSobre {
  Titulo?: string;
  corpo: any;
  Imagem: Media;
}
