import BeAReseller from "@/components/beAResellerFooter";
import BlueBgBox from "@/components/blueBgBox";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";
import { Revenda } from "@/types/revenda";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/network/map"), {
  ssr: false,
  loading: () => (
    <section className="container relative z-[1] mx-auto -mt-10 mb-16 flex min-h-[1000px] max-w-screen-xl rounded-3xl bg-white px-9 py-16">
      <span className="loading loading-spinner m-auto text-primary"></span>
    </section>
  ),
});

export default async function RedeCredenciada() {
  const resellerData = await fetchDataFromApi<Revenda[]>("revendas");
  const brandsData = await fetchDataFromApi<Marca[]>("marcas");
  const brands = brandsData.map((brand) => brand.attributes.Marca);

  return (
    <div>
      <section>
        <BlueBgBox
          bgImage="/blueprint.webp"
          boxStyles="w-screen h-[300px] after:!opacity-[36%]"
        >
          <header className="mx-auto mt-20 w-[700px] text-center text-white">
            <h1 className="mb-4 text-6xl font-bold">Rede Credenciada</h1>
            <p className="text-lg font-light">
              Aqui reunimos projetos incríveis de nossas empresas parceiras para
              que você conheça mais a fundo o que a sua casa inteligente pode
              fazer por você
            </p>
          </header>
        </BlueBgBox>
      </section>
      <MapWithNoSSR resellerData={resellerData} brands={brands} />
      <section>
        <BeAReseller />
      </section>
    </div>
  );
}
