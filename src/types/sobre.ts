import { DateAttributes } from "./common";
import { Contato, Corporativo, Pilares, Revendas } from "./components";

export interface Sobre {
  id: number;
  attributes: DateAttributes & {
    inicial: any;
    Pilar: Pilares[];
    Revendas: Revendas;
    Card: Corporativo[];
    Informacoes: Corporativo[];
    Contato: Contato[];
  };
}
