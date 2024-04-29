import { DateAttributes } from "./common";
import { Produto } from "./produto";

export interface CategoriasDeProduto {
  id: number;
  attributes: DateAttributes & {
    Titulo: string;
    produtos: { data: Produto[] };
  };
}
