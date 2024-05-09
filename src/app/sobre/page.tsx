import { Sobre } from "@/types/sobre";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import AboutBanner from "../../components/about/banner";
import AboutPillars from "../../components/about/pillars";

export default async function Page() {
  const data = await fetchDataFromApi<Sobre>("sobre");
  const { inicial, Pilar } = data.attributes;

  return (
    <>
      <AboutBanner inicial={inicial}></AboutBanner>
      <AboutPillars pillars={Pilar}></AboutPillars>
    </>
  );
}
