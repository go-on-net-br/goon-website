import BeAReseller from "@/components/beAResellerFooter";
import BlueBgBox from "@/components/blueBgBox";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Revenda } from "@/types/revenda";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/network/map"), {
  ssr: false,
  loading: () => (
    <section className="container relative z-[1] mx-auto -mt-10 mb-16 flex min-h-[1000px] max-w-screen-xl rounded-3xl bg-white px-9 py-16">
      <span className="m-auto loading loading-spinner text-primary"></span>
    </section>
  ),
});

export default async function RedeCredenciada() {
  const resellerData = await fetchDataFromApi<Revenda[]>("revendas");
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
      <MapWithNoSSR resellerData={resellerData} />
      <section>
        <BeAReseller />
      </section>
    </div>
  );
}
