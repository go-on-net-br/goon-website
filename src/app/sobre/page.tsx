import { Sobre } from "@/types/sobre";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import AboutBanner from "../../components/about/banner";
import AboutPillars from "../../components/about/pillars";
import AboutResales from "@/components/about/resales";
import { Revenda } from "@/types/revenda";

export default async function Page() {
  const data = await fetchDataFromApi<Sobre>("sobre");
  const { inicial, Pilar, Revendas } = data.attributes;

  return (
    <>
      <AboutBanner inicial={inicial}></AboutBanner>
      <AboutPillars pillars={Pilar}></AboutPillars>
      {Revendas != undefined && (
        <AboutResales resales={Revendas}></AboutResales>
      )}
    </>
  );
}
