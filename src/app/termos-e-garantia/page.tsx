import BlueBgBox from "@/components/blueBgBox";
import TermsTabs from "@/components/terms/tabs";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { TermoEAviso } from "@/types/termo-e-aviso";

export default async function Page() {
  const apiData = await fetchDataFromApi<TermoEAviso>("termo-e-aviso");
  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/containers.webp"
          boxStyles="w-screen pb-24 after:!opacity-[10%]"
        >
          <div className="mx-auto mt-20 w-[700px] text-center text-white">
            <h1 className="mb-4 text-6xl font-bold">Termos & Garantia</h1>
            <p className="text-lg font-light">
              Aqui reunimos projetos incríveis de nossas empresas parceiras para
              que você conheça mais a fundo o que a sua casa inteligente pode
              fazer por você
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className="container relative z-[1] mx-auto -mt-10 max-w-screen-xl rounded-3xl bg-white px-9 py-8">
        <TermsTabs apiData={apiData} />
      </section>
    </>
  );
}
