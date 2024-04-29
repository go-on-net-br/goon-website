import { DateAttributes } from "./common";
import { Corporativo } from "./components";

export interface TermoEAviso {
  id: number;
  attributes: DateAttributes & {
    TermoEGarantia: any;
    Avisos: Corporativo[];
  };
}
