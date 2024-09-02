import { Marca } from "@/types/marca";
import fetchDataFromApi from "./fetchFromApi";

export async function getBrands() {
  return await fetchDataFromApi<Marca[]>(
    "marcas",
    "populate=deep",
    "prioridade:desc",
  );
}
