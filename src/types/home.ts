import { DateAttributes, RedesSociais } from "./common";
import { Carrossel } from "./components";

export interface Home {
  id: number;
  attributes: DateAttributes & {
    Carrossel: Carrossel[];
    carrossel_mobile: Carrossel[]
  };
}
