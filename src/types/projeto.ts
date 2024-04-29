import { DateAttributes, Media } from "./common";
import { Marca } from "./marca";
import { Revenda } from "./revenda";

export interface Projeto {
  id: number;
  attributes: DateAttributes & {
    Titulo: string;
    revenda?: { data: Revenda };
    Sobre: string;
    media: { data: Media[] };
    marcas: { data: Marca[] };
    Tipo: string;
  };
}
