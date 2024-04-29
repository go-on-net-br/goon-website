import { DateAttributes, RedesSociais } from "./common";
import { Carrossel } from "./components";

export interface Home {
  id: number;
  attributes: DateAttributes & {
    Carrossel: Carrossel[];
    RedesGoOn: RedesSociais[];
    Endereco: string;
    telefone: string;
    contato: string;
  };
}
