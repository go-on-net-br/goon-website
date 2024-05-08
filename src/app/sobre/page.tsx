import { Sobre } from "@/types/sobre";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import AboutBanner from "./components/banner";

export default async function Page() {

    const data = await fetchDataFromApi<Sobre>('sobre');
    const { inicial } = data.attributes;

    return (
        <>
            <AboutBanner inicial={inicial}></AboutBanner>
        </>
    )
}