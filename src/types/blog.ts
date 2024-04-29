import { DateAttributes, Media } from "./common";
import { Marca } from "./marca";

export interface Blog {
  id: number;
  attributes: DateAttributes & {
    Titulo: string;
    Resumo?: string;
    Corpo: any;
    Capa: { data: Media };
    marcas: { data: Marca[] };
  };
}
