import { DateAttributes } from "./common";

export interface Credenciamento {
  id: number;
  attributes: DateAttributes & {
    video1: string;
    video2: string;
  };
}
