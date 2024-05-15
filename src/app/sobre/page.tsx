import { Sobre } from "@/types/sobre";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import AboutBanner from "../../components/about/banner";
import AboutPillars from "../../components/about/pillars";
import AboutResales from "@/components/about/resales";
import AboutMVV from "@/components/about/mvv";
import AboutInformation from "@/components/about/information";
import AboutContact from "@/components/about/contact";

export default async function Page() {
  const data = await fetchDataFromApi<Sobre>("sobre");
  const { inicial, Pilar, Revendas, Card, Informacoes, Contato } =
    data.attributes;

  return (
    <>
      <AboutBanner inicial={inicial} />
      <AboutPillars pillars={Pilar} />
      <AboutResales resales={Revendas} />
      <AboutMVV mvv={Card} />
      <AboutInformation information={Informacoes} />
      <AboutContact contact={Contato} />
    </>
  );
}
