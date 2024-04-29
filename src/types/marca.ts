import { DateAttributes, Media, RedesSociais } from "./common";
import { SecaoSobre } from "./components";
import { Produto } from "./produto";
import { Revenda } from "./revenda";

export interface Marca {
  id: number;
  attributes: DateAttributes & {
    Sobre: SecaoSobre[];
    Marca: string;
    Resumo?: string;
    Logotipo: { data: Media };
    Capa: { data: Media };
    Redes: RedesSociais[];
    revendas?: { data: Revenda[] };
    produtos: { data: Produto[] };
  };
}
