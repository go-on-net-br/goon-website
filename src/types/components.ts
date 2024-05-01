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
  Imagem: { data: Media };
  Corpo: string;
}

export interface Revendas {
  Titulo: string;
  Foto: { data: Media };
  Corpo: string;
}

export interface Carrossel {
  URL?: string;
  Midia: { data: Media };
  Titulo: string;
}

export interface SecaoSobre {
  Titulo?: string;
  corpo: any;
  Imagem: { data: Media };
}
