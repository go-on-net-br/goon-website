import BeAReseller from "@/components/beAResellerFooter";
import BlueBgBox from "@/components/blueBgBox";
import NetworkMap from "@/components/network/map";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Revenda } from "@/types/revenda";

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
      <NetworkMap resellerData={resellerData} />
      <section>
        <BeAReseller />
      </section>
    </div>
  );
}
