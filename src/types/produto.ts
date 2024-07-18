import { CategoriasDeProduto } from "./categorias-de-produto";
import { DateAttributes, Media } from "./common";
import { Marca } from "./marca";

export interface Produto {
  id: number;
  attributes: DateAttributes & {
    Titulo: string;
    marca?: { data: Marca };
    categoria?: { data: CategoriasDeProduto };
    FotoseVideos: { data: Media[] };
    Caracteristicas?: string;
    Especificacoes?: string;
    Codigo: number;
  };
}
