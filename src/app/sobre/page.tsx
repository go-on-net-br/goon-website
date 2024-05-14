import { Sobre } from "@/types/sobre";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import AboutBanner from "../../components/about/banner";
import AboutPillars from "../../components/about/pillars";
import AboutResales from "@/components/about/resales";
import { Revenda } from "@/types/revenda";
import AboutMVV from "@/components/about/mvv";
import AboutInformation from "@/components/about/information";

export default async function Page() {
  const data = await fetchDataFromApi<Sobre>("sobre");
  const { inicial, Pilar, Revendas, Card, Informacoes } = data.attributes;

  return (
    <>
      <AboutBanner inicial={inicial}></AboutBanner>
      <AboutPillars pillars={Pilar}></AboutPillars>
      <AboutResales resales={Revendas}></AboutResales>
      <AboutResales resales={Revendas}></AboutResales>
      <AboutMVV mvv={Card}></AboutMVV>
      <AboutInformation information={Informacoes}></AboutInformation>
    </>
  );
}
