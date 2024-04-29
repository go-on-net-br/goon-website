import { DateAttributes, Media } from "./common";

export interface Depoimento {
  id: number;
  attributes: DateAttributes & {
    Nome: string;
    Cargo: string;
    Empresa: string;
    Depoimento: string;
    Foto: { data: Media };
  };
}
