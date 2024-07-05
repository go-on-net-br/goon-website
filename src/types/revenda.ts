import { DateAttributes } from "./common";
import { Marca } from "./marca";
import { Projeto } from "./projeto";

export interface Revenda {
  id: number;
  attributes: DateAttributes & {
    Titulo: string;
    Endereco: string;
    Telefone?: string;
    Email?: string;
    Site?: string;
    ShowroomAudio?: boolean;
    ShowroomAutomacao?: boolean;
    marcas?: { data: Marca[] };
    projetos: { data: Projeto[] };
    Coordenadas?: { lat: string; lng: string };
    credenciamentoFim?: string;
    credenciamentoInicio?: string;
  };
}
